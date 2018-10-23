import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {constants, getStageName} from 'app/shared/constants';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {PartialMatrix} from '../../shared/PartialMatrix';
import {Router} from '@angular/router';
import {Predictor} from '../../shared/Predictor';
import {NGXLogger} from 'ngx-logger';
import {query, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from 'ng-animate';
import {NavigationService} from '../../shared/navigation.service';
import {Observable} from 'rxjs/Observable';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  animations: [
    trigger('fade', [
      transition('* => *', [
          query(':enter',
            useAnimation(fadeIn, {
              params: { timing: 0.2}
            }), {optional: true}
          ),
          query(':leave',
            useAnimation(fadeOut, {
              params: { timing: 0.2}
            }), {optional: true})
        ]
      )
    ])
  ],
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _stages = constants.HYPOTHESIS_BETWEEN_STAGES;
  private _stage = this.stages.INFO;
  private _next = this.stages.INFO;
  private _showAdvancedOptions: boolean;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _isuFactors: ISUFactors;
  private _marginalsIn: Array<PartialMatrix>;
  private _marginalsOut: Array<PartialMatrix>;

  private _isuFactorsSubscription: Subscription;
  texString = '';

  @ViewChild('content') contentModal;
  private modalReference: any;

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private router: Router,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.marginalsIn = [];
    this.marginalsOut = [];
    this.showAdvancedOptions = false;

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.calculateCMatrix();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  selectHypothesisNature(type: string) {
    this.calculateCMatrix();
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  calculateCMatrix() {
    if (!isNullOrUndefined( this._isuFactors )) {
      this.marginalsIn = [];
      this.marginalsOut = [];
      // work out which between factors are in the hypothesis
      const marginalMatrices = [];
      const betweenFactorsInHypothesis = [];
      const betweenFactorsNotInHypothesis = [];
      this.determineBetweenFactorsinHypothesis(betweenFactorsInHypothesis, betweenFactorsNotInHypothesis);
      this.populateMarginalMatrices(betweenFactorsInHypothesis, marginalMatrices);
      this.populateAverageMatrices(betweenFactorsNotInHypothesis, marginalMatrices);

      const cMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.CMATRIX);
      let first = marginalMatrices.pop();
      if (isNullOrUndefined(first) || isNullOrUndefined(first.values)) {
        first = new PartialMatrix(constants.C_MATRIX_TYPE.AVERAGE);
        first.values = math.matrix([[1]]);
      }
      cMatrix.values = first.values;
      if (!isNullOrUndefined(marginalMatrices) && marginalMatrices.length > 0) {
        marginalMatrices.forEach( matrix => {
          cMatrix.values = cMatrix.kronecker(matrix);
        });
      }
      this.texString = cMatrix.toTeX();
    };
  }

  private populateAverageMatrices(betweenFactorsNotInHypothesis: Array<string>, marginalMatrices: Array<PartialMatrix>) {
    betweenFactorsNotInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.AVERAGE);
          marginalMatrix.poopulateAverageMatrix(value.valueNames.length);
          marginalMatrices.push(marginalMatrix);
          marginalMatrix.name = name;
          this.marginalsOut.push(marginalMatrix);
        }
      });
    });
  }

  private populateMarginalMatrices(betweenFactorsInHypothesis: Array<string>, marginalMatrices: Array<PartialMatrix>) {
    betweenFactorsInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = this.getMarginalCMatrix(value);
          marginalMatrices.push(marginalMatrix);
          marginalMatrix.name = name;
          this.marginalsIn.push(marginalMatrix);
        }
      });
    });
  }

  private determineBetweenFactorsinHypothesis( inHypothesis: Array<string>, outOfHypothesis: Array<string> ) {
    this._isuFactors.predictors.forEach(predictor => {
      let inEffect = false;
      this._isuFactors.hypothesis.forEach(variable => {
        if ( predictor.compare(variable) ) {
          inHypothesis.push(predictor.name);
          inEffect = true;
        }
      });
      if (inEffect === false) {
        outOfHypothesis.push(predictor.name);
      }
    });
  }

  setNature(name: string, nature: string) {
    this.log.debug( name + ' set: ' + nature );
    this.isuFactors.predictors.forEach( predictor => {
        if (predictor.name === name) {
          predictor.isuFactorNature = nature;
        }
      }
    );
    this.calculateCMatrix();
  }

  advancedOptions() {
    this.editCustom();
  }

  editCustom() {
    this._next = this.stages.EDIT_CUSTOM;
    this._stage = -1;
  }

  showInfo() {
    this._next = this.stages.INFO;
    this._stage = -1;
  }

  getMarginalCMatrix (predictor: Predictor): PartialMatrix {
    const noGroups = predictor.valueNames.length;
    const marginalMatrix = new PartialMatrix();
    if (isNullOrUndefined(predictor.isuFactorNature)) {
      predictor.isuFactorNature = constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS;
    }
    if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS) {
        marginalMatrix.type = constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS;
        marginalMatrix.populateCMainEffect(noGroups);
      } else if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.POLYNOMIAL) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.POLYNOMIAL;
        marginalMatrix.populatePolynomialEvenSpacing(noGroups);
      } else if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.IDENTITY) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.IDENTITY;
        marginalMatrix.populateIdentityMatrix(noGroups);
      }
      marginalMatrix.name = predictor.name;
    return marginalMatrix;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  get marginalsIn(): Array<PartialMatrix> {
    return this._marginalsIn;
  }

  set marginalsIn(value: Array<PartialMatrix>) {
    this._marginalsIn = value;
  }

  get marginalsOut(): Array<PartialMatrix> {
    return this._marginalsOut;
  }

  set marginalsOut(value: Array<PartialMatrix>) {
    this._marginalsOut = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get stages(): { INFO: number; EDIT_CUSTOM: number } {
    return this._stages;
  }

  get stage(): number {
    return this._stage;
  }

  setStage(next: number) {
      if (next === this.stages.INFO) {
        this.navigation_service.updateValid(true);
      } else {
        this.navigation_service.updateValid(false);
      }
      this._stage = next;
  }

  isInfo() {
    if (this._stage === this.stages.INFO) {
      return true;
    } else {
      return false
    }
  }

  isEditCustom() {
    if (this._stage === this.stages.EDIT_CUSTOM) {
      return true;
    } else {
      return false
    }
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.stage === this.stages.INFO) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.contentModal);
      this.study_service.updateDirection('CANCEL');
      return this.navigation_service.navigateAwaySelection$;
    }
  }

  showModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then(
      (closeResult) => {
        console.log('modal closed : ', closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          console.log('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('modal dismissed when used pressed backdrop');
        } else {
          console.log(dismissReason);
        }
      })
  }

  modalChoice(choice: boolean) {
    this.modalReference.close();
    if (choice) {
      // this.resetForms();
      this.navigation_service.updateValid(true);
    }
    this.navigation_service.navigateAwaySelection$.next(choice);
  }
}
