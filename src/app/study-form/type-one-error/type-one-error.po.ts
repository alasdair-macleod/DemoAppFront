import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';

export class TypeOneErrorPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.type_one_error)) {
      this.fillForm(source.type_one_error);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const typeOneErrorInput = element(by.id('typeoneerror'));
      typeOneErrorInput.clear().then(() => typeOneErrorInput.sendKeys(input));
    }
  }
}