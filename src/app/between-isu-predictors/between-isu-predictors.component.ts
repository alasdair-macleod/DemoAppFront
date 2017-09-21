import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BetweenISUFactors} from '../shared/BetweenISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../shared/study.service';
import {NavigationService} from '../shared/navigation.service';
import {Predictor} from '../shared/Predictor';
import {constants} from '../shared/constants';
import {outcomeValidator} from '../within-isu-outcomes/outcome.validator';
import {BetweenIsuCombinationTable} from '../shared/BetweenIsuCombinationTable';

@Component({
  selector: 'app-between-isu',
  templateUrl: './between-isu-predictors.component.html',
  styleUrls: ['./between-isu-predictors.component.css']
})
export class BetweenIsuPredictorsComponent implements OnInit, DoCheck, OnDestroy {
  private _predictorForm: FormGroup;
  private _groupsForm: FormGroup;
  private _groupSizeForm: FormGroup;
  private _relativeGroupSizeForm: FormGroup;
  private _groups: string[];
  private _maxGroups: number;
  private _maxPredictors: number;
  private _betweenIsuFactors: BetweenISUFactors;
  private _solveFor: string;

  private _tables: BetweenIsuCombinationTable[];

  private _editing: boolean;
  private _stages;
  private _stage: number;
  private _directionCommand: string;
  private _navigationSubscription: Subscription;

  private _betweenIsuFactorsSubscription: Subscription;
  private _solveForSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService) {
    this.stages = constants.BETWEEN_ISU_STAGES;
    this.stage = -1;

    this.groups = [];
    this.maxGroups = constants.MAX_GROUPS;
    this.maxPredictors = constants.MAX_PREDICTORS;

    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );

    this.betweenIsuFactorsSubscription = this.study_service.betweenIsuFactors$.subscribe( betweenIsuFactors => {
      this.betweenIsuFactors = betweenIsuFactors;
    });

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe( solveFor => {
      this.solveFor = solveFor;
    })
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    if (this.stage === 2 && this.solveFor === 'SAMPLESIZE') {
      this.updateCombinations();
    }
    if (this.stage === 2 && this.solveFor === 'POWER') {
      this.updateSmallestGroupSize();
    }
    this.updateFormStatus();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.betweenIsuFactorsSubscription.unsubscribe();
  }

  buildForm() {
    this.predictorForm = this.fb.group({
      predictorName: ['', outcomeValidator(this.betweenIsuFactors ? this.betweenIsuFactors.predictorNames : [] )]
    });
    this.groupsForm = this.fb.group({
      group: ['', outcomeValidator(this.groups)]
    });
    this.groupSizeForm = this.fb.group( {
      smallestGroupSize: [1]
    } );
    this.relativeGroupSizeForm = this.fb.group( {} )
  }

  private updateFormStatus() {
    if (this.stage === 0) {
      this.setNextEnabled(this.predictorForm.status);
    }
    if (this.stage === 1) {
      this.setNextEnabled(this.groupsForm.status);
    }
    if (this.stage === 2 && this.solveFor === 'POWER') {
      this.setNextEnabled(this.groupSizeForm.status);
    }
    if (this.stage === 2 && this.solveFor === 'SAMPLESIZE') {
      this.setNextEnabled(this.relativeGroupSizeForm.status);
    }
    this.study_service.updateBetweenIsuFactors(this.betweenIsuFactors);
  }


  firstGroup(): boolean {
    return this.groups.length === 0 ? true : false;
  }

  nextGroup(): boolean {
    if (!this.firstGroup() && this.groups.length < this.maxGroups ) {
      return true;
    }
    return false;
  }

  addGroup() {
    if (this.groupsForm.status === 'VALID' && this.groupsForm.value.group && this.groupsForm.value.group.trim() !== '' ) {
      this.groups.push(this.groupsForm.value.group);
      this.groupsForm.reset();
    }
  }

  removeGroup(group: string) {
    const index = this.groups.indexOf(group);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    this.groupsForm.reset();
  }

  includeBetweenIsuFactors(predictor?: Predictor) {
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled( true );
    this.navigation_service.updateValid(false);
    if (!this.betweenIsuFactors) {
      this.betweenIsuFactors = new BetweenISUFactors();
    }
    if ( predictor ) {
      this.predictorForm.get('predictorName').setValue(predictor.name)
      this.groups = predictor.groups;
      if ( this.predictorForm.status === 'VALID' ) {
        this.navigation_service.updateValid( true );
      }
    }
    this.stage = 0;
  }

  resetNavigation() {
    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
    this.navigation_service.updateValid(true);
  }

  addPredictor() {
    const predictor = new Predictor();
    predictor.name = this.predictorForm.value.predictorName;
    predictor.groups = this.groups;

    this.betweenIsuFactors.predictors.push(predictor);
    this.editing = false;
  }

  removePredictor(predictor: Predictor) {
    const index = this.betweenIsuFactors.predictors.indexOf(predictor);
    if (index > -1) {
      this.betweenIsuFactors.predictors.splice(index, 1);
    }

    this.navigation_service.updateNavigationMode(true);
  }

  editPredictor(predictor: Predictor) {
    this.removePredictor(predictor);
    this.includeBetweenIsuFactors(predictor);

    this.navigation_service.updateNavigationMode(true);
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.predictorForm.status;
    }
    if (stage === 1) {
      return this.groupsForm.status;
    }
    return 'INVALID';
  }

  internallyNavigate(direction: string): void {
    let next = this.stage;
    if ( direction === 'BACK' ) {
      if (this.stage === 2 ) {
        next = -1;
      } else {
        next = this.stage - 1;
      }
    }
    if ( direction === 'NEXT' ) {
      if (this.stage === -1
        && !this.editing
        && this.hasPredictors() ) {
        next = 2;
        this.updateGroupsizeFormControls();
      } else if (this.stage === 1
        && this.editing ) {
        this.addPredictor();
        next = -1;
      } else {
        next = this.stage + 1;
      }
    }
    if ( next < 0) {
      this.editing = false;
      this.resetForms();
    }
    if ( next >= Object.keys(this.stages).length ) {
      this.resetForms();
      this.resetNavigation();
    }
    if (this.stages[next] || next === -1) {
      this.setStage(next);
    }
  }


  setStage(next: number) {
    this.stage = next;
    this.setNextEnabled(this.getStageStatus(this.stage));
    if (this.stage === -1 ) {
      this.setNextEnabled('VALID');
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  resetForms() {
    this.groupsForm.reset();
    this.predictorForm.reset();
    this.relativeGroupSizeForm.reset();
    this.groupSizeForm.reset();
    this.groups = [];
    this.buildForm();
  }

  updateCombinations() {
    this.betweenIsuFactors.combinations.forEach( combination => {
      const value = this.relativeGroupSizeForm.get(combination.name).value;
      combination.size = value;
    });
  }

  updateSmallestGroupSize() {
    this.betweenIsuFactors.smallestGroupSize = this.groupSizeForm.value.smallestGroupSize;
  }

  updateGroupsizeFormControls() {
    this.betweenIsuFactors.generateCombinations();
    this.study_service.updateBetweenIsuFactors(this.betweenIsuFactors);
    this.tables = this.betweenIsuFactors.groupCombinations();
    const controlDefs = {};
    this.tables.forEach( table => {
      const names = table.table.keys();
      let done = false;
      let next = names.next();
      while ( !done ) {
        const key = next.value;
        const combination = table.table.get(key);
        controlDefs[combination.name] = [1];
        next = names.next();
        done = next.done;
      }
    });
    this.relativeGroupSizeForm = this.fb.group(controlDefs);
  }

  hasPredictors(): boolean {
    if (this.betweenIsuFactors) {
      return this.betweenIsuFactors.predictors.length > 0;
    }
    return false;
  }

  nextPredictors(): boolean {
    if (this.hasPredictors() && this.betweenIsuFactors.predictors.length < this.maxPredictors ) {
      return true;
    }
    return false;
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get predictorForm(): FormGroup {
    return this._predictorForm;
  }

  set predictorForm(value: FormGroup) {
    this._predictorForm = value;
  }

  get groupsForm(): FormGroup {
    return this._groupsForm;
  }

  set groupsForm(value: FormGroup) {
    this._groupsForm = value;
  }

  get groupSizeForm(): FormGroup {
    return this._groupSizeForm;
  }

  set groupSizeForm(value: FormGroup) {
    this._groupSizeForm = value;
  }

  get relativeGroupSizeForm(): FormGroup {
    return this._relativeGroupSizeForm;
  }

  set relativeGroupSizeForm(value: FormGroup) {
    this._relativeGroupSizeForm = value;
  }

  get betweenIsuFactors(): BetweenISUFactors {
    return this._betweenIsuFactors;
  }

  set betweenIsuFactors(value: BetweenISUFactors) {
    this._betweenIsuFactors = value;
  }

  get betweenIsuFactorsSubscription(): Subscription {
    return this._betweenIsuFactorsSubscription;
  }

  set betweenIsuFactorsSubscription(value: Subscription) {
    this._betweenIsuFactorsSubscription = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get groups(): string[] {
    return this._groups;
  }

  set groups(value: string[]) {
    this._groups = value;
  }

  get maxGroups(): number {
    return this._maxGroups;
  }

  set maxGroups(value: number) {
    this._maxGroups = value;
  }

  get maxPredictors(): number {
    return this._maxPredictors;
  }

  set maxPredictors(value: number) {
    this._maxPredictors = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get tables(): BetweenIsuCombinationTable[] {
    return this._tables;
  }

  set tables(value: BetweenIsuCombinationTable[]) {
    this._tables = value;
  }
}