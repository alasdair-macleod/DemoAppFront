import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisEffectChoiceComponent } from './hypothesis-effect-choice.component';
import {HypothesisEffectVariable} from '../shared/HypothesisEffectVariable';
import {HypothesisEffect} from '../shared/HypothesisEffect';
import {StudyService} from '../shared/study.service';
import {ReactiveFormsModule} from '@angular/forms';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {constants} from "../shared/constants";

describe('HypothesisEffectChoiceComponent', () => {
  let component: HypothesisEffectChoiceComponent;
  let fixture: ComponentFixture<HypothesisEffectChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ HypothesisEffectChoiceComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisEffectChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly equals lists of Hypothesis Effect Variables', () => {
    const A = new HypothesisEffectVariable('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new HypothesisEffectVariable('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new HypothesisEffectVariable('C', constants.HYPOTHESIS_NATURE.WITHIN);
    const D = new HypothesisEffectVariable('D', constants.HYPOTHESIS_NATURE.WITHIN);
    const E = new HypothesisEffectVariable('E', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C, D);

    const eff1 = new HypothesisEffect();
    eff1.variables = [A, B, C, D];
    const eff2 = new HypothesisEffect();
    eff2.variables = [B, C, A, D];
    const comp = eff1.equals(eff2);

    expect(comp).toEqual(true);

    eff2.variables = [B, E, A, D];
    const compFalse = eff1.equals(eff2);

    expect(compFalse).toEqual(false);
  });

  it('should return 15 distinct effects', () => {
    const A = new HypothesisEffectVariable('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new HypothesisEffectVariable('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new HypothesisEffectVariable('C', constants.HYPOTHESIS_NATURE.WITHIN);
    const D = new HypothesisEffectVariable('D', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(16);
  });

  it('should return 7 distinct effects', () => {
    const A = new HypothesisEffectVariable('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new HypothesisEffectVariable('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new HypothesisEffectVariable('C', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(8);
  });

  it('should return 1 distinct effects', () => {
    const A = new HypothesisEffectVariable('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    component.variables.push(A);
    component.determinePossibleEffects();
    expect(component.possibleEffects.length).toEqual(2);
  });

  it('should return 0 distinct effects', () => {
    component.determinePossibleEffects();
    expect(component.possibleEffects.length).toEqual(1);
  });
});
