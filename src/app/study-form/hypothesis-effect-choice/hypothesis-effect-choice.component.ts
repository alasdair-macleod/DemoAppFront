import {Component, Input, OnInit} from '@angular/core';
import {ISUFactor} from '../../shared/ISUFactor';
import {HypothesisEffect} from '../../shared/HypothesisEffect';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/ISUFactors';
import {StudyService} from '../study.service';
import {FormBuilder} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-hypothesis-effect-choice',
  templateUrl: './hypothesis-effect-choice.component.html',
  styleUrls: ['./hypothesis-effect-choice.component.css']
})
export class HypothesisEffectChoiceComponent implements OnInit {
  private _variables: ISUFactor[];
  private _possibleEffects: HypothesisEffect[];
  private _selected: HypothesisEffect;
  private _showInfo: boolean;

  private _hypothesisEffectSubscription: Subscription;
  private _isuFactorsSubscription: Subscription;

  constructor(private _fb: FormBuilder, private _study_service: StudyService) {
    this.possibleEffects = [];

    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.variables = isuFactors.variables;
    } );
    this.hypothesisEffectSubscription = this._study_service.hypothesisEffect$.subscribe( effect => {
      this._selected = effect;
    });
    this.showInfo = false;
  }

  ngOnInit() {
    this.determinePossibleEffects();
    if ( isNullOrUndefined(this._selected) ) { this.selectEffect(this.possibleEffects[0]); }
  }

  selectEffect(effect: HypothesisEffect) {
    this._selected = effect;
    this.study_service.updateHypothesisEffect(effect);
  }

  isSelected(effect: HypothesisEffect): boolean {
    return effect.equals(this._selected);
  }

  rowStyle(index: number) {
    if (index % 2 === 0 ) {
      return '#d9edf7';
    } else {
      return 'transparent';
    }
  }

  determinePossibleEffects() {
    const grandMean = new HypothesisEffect();
    this.addEffectToList(grandMean);
    this.variables.sort(this.compareVariables);
    let filteredVariables = this.deepCopyList(this.variables);
    filteredVariables = this.filterVariables(filteredVariables);

    this.variables.forEach( variable =>  {
      if (variable.origin !== constants.HYPOTHESIS_ORIGIN.OUTCOME && variable.origin !== constants.HYPOTHESIS_ORIGIN.CLUSTER) {
          const effect = new HypothesisEffect();
          effect.addVariable(variable);
          this.generateCombinations(effect, filteredVariables);
      }
    });
    this.possibleEffects.sort(this.compare);
  }

  filterVariables(vars: Array<ISUFactor>) {
    const toDelete = [];
    vars.forEach(v => {
      if (v.origin === constants.HYPOTHESIS_ORIGIN.OUTCOME || v.origin === constants.HYPOTHESIS_ORIGIN.CLUSTER) {
        toDelete.push(this.variables.indexOf(v));
      }
    });
    toDelete.reverse();
    toDelete.forEach(index => {
      vars.splice(index, 1);
    });
    return vars;
  }

  generateCombinations(effect: HypothesisEffect, variables) {
    this.addEffectToList(effect);
    variables = this.removeExistingVariables(effect, variables);
    variables.forEach(variable => {
      const vars = this.deepCopyList(variables);
      const newEffect = this.deepCopyEffect(effect);
      newEffect.addVariable(variable);
      this.addEffectToList(newEffect);
      this.generateCombinations(newEffect, vars);
    });
  }

  addEffectToList(effect: HypothesisEffect) {
    if (!this.effectInList(effect, this.possibleEffects)) {
      const newEffect = this.deepCopyEffect(effect);
      this.possibleEffects.push(newEffect);
    }
  }

  effectInList(effect: HypothesisEffect, list: HypothesisEffect[]) {
    let effectInList = false;
    list.forEach(value => {
      if (effect.equals(value)) { effectInList = true; }
    })
    return effectInList;
  }

  removeExistingVariables(effect: HypothesisEffect, variables: ISUFactor[]) {
    effect.variables.forEach( val => {
      const index = variables.indexOf(val);
      if (index !== -1) {
        variables.splice(index, 1)
      };
    })
    return variables;
  }

  deepCopyList(list) {
    const newList = [];
    list.forEach( val => { newList.push(val); } );
    return newList;
  }

  deepCopyEffect(effect: HypothesisEffect) {
    const newEffect = new HypothesisEffect();
    effect.variables.forEach(val => {
      newEffect.addVariable(val);
    })
    return newEffect;
  }

  isGrandMean(effect: HypothesisEffect): boolean {
    return effect.type === constants.HYPOTHESIS_EFFECT_TYPE.GRAND_MAEN ? true : false;
  }

  showOrCloseInfo() {
    this.showInfo = !this.showInfo;
  }

  compare(a: HypothesisEffect, b: HypothesisEffect) {
    let ret = 0;

    if (!a.equals(b)) {
      const aNaturesArray: string[] = [];
      a.variables.forEach(variable => {
        aNaturesArray.push(variable.nature);
      });
      const aNaturesSet = new Set(aNaturesArray);
      const aAmountOfNatureType = aNaturesSet.size;

      const bNaturesArray: string[] = [];
      b.variables.forEach(variable => {
        bNaturesArray.push(variable.nature);
      });
      const bNaturesSet = new Set(bNaturesArray);
      const bAmountOfNatureType = bNaturesSet.size;

      if (aAmountOfNatureType < bAmountOfNatureType) {
        ret = -1;
      }
      if (aAmountOfNatureType > bAmountOfNatureType) {
        ret = 1;
      }
      if (aAmountOfNatureType === bAmountOfNatureType) {
        if (aAmountOfNatureType === 1) {
          const aNature = aNaturesSet.has(constants.HYPOTHESIS_NATURE.BETWEEN) ? 2 : 1;
          const bNature = bNaturesSet.has(constants.HYPOTHESIS_NATURE.BETWEEN) ? 2 : 1;

          if (aNature < bNature) {
            ret = 1;
          }
          if (aNature > bNature) {
            ret = -1;
          }
          if (aNature === bNature) {
            if (a.variables.length < b.variables.length) {
              ret = -1;
            }
            if (a.variables.length > b.variables.length) {
              ret = 1;
            }
          }
        }

        if (aAmountOfNatureType === 2) {
          if (a.variables.length < b.variables.length) {
            ret = -1;
          }
          if (a.variables.length > b.variables.length) {
            ret = 1;
          }
          if (a.variables.length === b.variables.length) {
            console.log(aNaturesArray, bNaturesArray);
            for (const i of Object.keys(aNaturesArray)) {
              const aNature = aNaturesArray[i] === constants.HYPOTHESIS_NATURE.BETWEEN ? 2 : 1;
              const bNature = bNaturesArray[i] === constants.HYPOTHESIS_NATURE.BETWEEN ? 2 : 1;

              if (aNature < bNature) {
                ret = 1;
                break;
              }
              if (aNature > bNature) {
                ret = -1;
                break;
              }
            }
          }
        }
      }
    }
    return ret;
  }

  compareVariables(a: ISUFactor, b: ISUFactor) {
    let ret = 0;

    const aNature = a.nature === constants.HYPOTHESIS_NATURE.BETWEEN ? 2 : 1;
    const bNature = b.nature === constants.HYPOTHESIS_NATURE.BETWEEN ? 2 : 1;

    if (aNature < bNature) {
      ret = 1;
    }
    if (aNature > bNature) {
      ret = -1;
    }

    return ret;
  }

  get possibleEffects(): HypothesisEffect[] {
    return this._possibleEffects;
  }

  set possibleEffects(value: HypothesisEffect[]) {
    this._possibleEffects = value;
  }

  get showInfo(): boolean {
    return this._showInfo;
  }

  set showInfo(value: boolean) {
    this._showInfo = value;
  }

  set hypothesisEffectSubscription(value: Subscription) {
    this._hypothesisEffectSubscription = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  get variables(): ISUFactor[] {
    return this._variables;
  }

  set variables(value: ISUFactor[]) {
    this._variables = value;
  }
}

