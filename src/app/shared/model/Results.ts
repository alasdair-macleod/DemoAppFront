import {LinearModel} from './LinearModel';
import {isNullOrUndefined} from 'util';

interface ResultJSON {
  model: LinearModel;
  power: Array<number>;
  lower_bound: Array<number>;
  upper_bound: Array<number>;
  test: string;
  samplesize: Array<number>;
}

export class Result {
  model:  LinearModel;
  power: Array<number>;
  lower_bound: Array<number>;
  upper_bound: Array<number>;
  test: string;
  samplesize: Array<number>;

  // fromJSON is used to convert an serialized version
  // of the Result to an instance of the class
  static fromJSON(json: ResultJSON|string): Result {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Result.reviver);
    } else {
      // create an instance of the StudyDesign class
      const result = Object.create(Result.prototype);
      // copy all the fields from the json object
      return Object.assign(result, json, {
        // convert fields that need converting
        model: LinearModel.fromJSON(JSON.stringify(json.model)),
        power: this.parsePower(json),
        lower_bound: this.parseLowerBound(json),
        upper_bound: this.parseUpperBound(json),
        test: this.parseTest(json),
        samplesize: this.parseSamplesize(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Result.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Result.fromJSON(value) : value;
  }

  static parsePower(json: ResultJSON) {
    if (!isNullOrUndefined(json.power)) {
      return json.power
    } else {
      return null;
    }
  }

  static parseLowerBound(json: ResultJSON) {
    if (!isNullOrUndefined(json.lower_bound)) {
      return json.lower_bound
    } else {
      return null;
    }
  }

  static parseUpperBound(json: ResultJSON) {
    if (!isNullOrUndefined(json.upper_bound)) {
      return json.upper_bound
    } else {
      return null;
    }
  }

  static parseSamplesize(json: ResultJSON) {
    if (!isNullOrUndefined(json.samplesize)) {
      return json.samplesize
    } else {
      return null;
    }
  }

  static parseTest(json: ResultJSON) {
    if (!isNullOrUndefined(json.test)) {
      return json.test
    } else {
      return null;
    }
  }

  constructor() {
    this.model = new LinearModel();
    this.power = [];
    this.samplesize = [];
  }
}
