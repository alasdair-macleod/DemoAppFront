import {isNullOrUndefined} from 'util';


interface LinearModelJSON {
  total_n: number;
  errors: string;
  target_power: number;
  means_scale_factor: number;
  variance_scale_factor: number;
  test: number;
  power_method: string;
  quantile: string;
  alpha: number;
}

export class LinearModel {
  total_n: number;
  errors: string;
  target_power: number;
  means_scale_factor: number;
  variance_scale_factor: number;
  test: string;
  power_method: string;
  quantile: number;
  alpha: number;

  static fromJSON(json: LinearModelJSON|string): LinearModel {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, LinearModel.reviver);
    } else {
      // create an instance of the StudyDesign class
      const linearmodel = Object.create(LinearModel.prototype);
      // copy all the fields linearmodel the json object
      return Object.assign(linearmodel, json, {
        // convert fields that need converting
        total_n: this.parseTotalN(json),
        errors: this.parseErrors(json),
        target_power: this.parseTargetPower(json),
        means_scale_factor: this.parseMeanScaleFactor(json),
        variance_scale_factor: this.parseVarianceScaleFactor(json),
        test: this.parseTest(json),
        power_method: this.parsePowerMethod(json),
        alpha: this.parseAlpha(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Results.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? LinearModel.fromJSON(value) : value;
  }

  static parseTotalN(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.total_n)) {
      return json.total_n
    } else {
      return null;
    }
  }

  static parseErrors(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.errors)) {
      return json.errors
    } else {
      return null;
    }
  }

  static parseTargetPower(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.target_power)) {
      return json.target_power
    } else {
      return null;
    }
  }

  static parseMeanScaleFactor(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.means_scale_factor)) {
      return json.means_scale_factor
    } else {
      return null;
    }
  }

  static parseVarianceScaleFactor(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.variance_scale_factor)) {
      return json.variance_scale_factor
    } else {
      return null;
    }
  }

  static parseTest(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.test)) {
      return json.test
    } else {
      return null;
    }
  }

  static parsePowerMethod(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.power_method)) {
      if (json.power_method === 'quantile') {
        return json.power_method + ': ' +  json.quantile;
      } else {
        return json.power_method;
      }
    } else {
      return null;
    }
  }

  static parseAlpha(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.alpha)) {
      return json.alpha
    } else {
      return null;
    }
  }

  constructor() {}
}
