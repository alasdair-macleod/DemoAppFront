import { UntypedFormArray, ValidatorFn} from '@angular/forms';

export function statisticalTestsValidator(min = 1, isClickNext: {value: boolean}) {
  const validator: ValidatorFn = (formArray: UntypedFormArray) => {
    if (isClickNext) {
      const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { 'notestselected': 'Need to choose one test to go to next step.' };
    } else {
      return null;
    }
  };

  return validator;
}
