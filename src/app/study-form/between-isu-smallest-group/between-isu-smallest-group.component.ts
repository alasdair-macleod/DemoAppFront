import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISUFactors} from '../../shared/ISUFactors';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from '../../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-between-isu-smallest-group',
  templateUrl: './between-isu-smallest-group.component.html',
  styleUrls: ['./between-isu-smallest-group.component.scss']
})
export class BetweenIsuSmallestGroupComponent implements OnInit, DoCheck, OnDestroy {

  private _isuFactors: ISUFactors;
  private _groupSizeForm: FormGroup;
  private _isuFactorsSubscription: Subscription;
  private _formErrors = constants.BETWEEN_ISU_ERRORS;
  private _validationMessages = constants.BETWEEN_ISU_VALIDATION_MESSAGES;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService,
              private logger: NGXLogger) {}

  ngOnInit() {
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.buildForm();
  }

  ngDoCheck() {
    this.updateSmallestGroupSize();
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  buildForm() {
    this.groupSizeForm = this.fb.group( this.updateSmallestGroupSizeControls() );

    this.groupSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.groupSizeForm) {
      return;
    }
    const form = this.groupSizeForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  updateSmallestGroupSizeControls() {
    return { smallestGroupSize: [ this.isuFactors.smallestGroupSize, minMaxValidator(0, 100000000000, this.logger) ] }
  }

  updateSmallestGroupSize() {
    if ( !isNullOrUndefined(this.isuFactors) ) {
      this.isuFactors.smallestGroupSize = this.groupSizeForm.value.smallestGroupSize;
    }
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get groupSizeForm(): FormGroup {
    return this._groupSizeForm;
  }

  set groupSizeForm(value: FormGroup) {
    this._groupSizeForm = value;
  }

  get formErrors(): { smallestgroup: string; } {
    return this._formErrors;
  }

  set formErrors(value: { smallestgroup: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    smallestgroup: { minval: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    smallestgroup: { minval: string; };
  }) {
    this._validationMessages = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
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
}
