import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {PartialMatrix} from './PartialMatrix';

export class RepeatedMeasure extends ISUFactor {
  units: string;
  type: string;
  private _noRepeats: number;
  partialUMatrix: PartialMatrix;

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN ;
    this.origin = constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE;

    this.units = '';
    this.type = '';
    this._noRepeats = 0;
    this.partialUMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
  }

  get noRepeats(): number {
    return this._noRepeats;
  }

  set noRepeats(value: number) {
    this._noRepeats = value;
    this.partialUMatrix.populateUMainEffect(value);
  }
}
