import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {example_1_input, example_1_output} from './test_inputs/example_1_input';
import {generic_model} from './test_inputs/generic_test_data_model';
import {O2R2P2C0_input, O2R2P2C0_output} from './test_inputs/O2R2P2C0_output';
import {hw2_input, hw2_output} from './test_inputs/homework2_longitudinal';
import {hw3_input, hw3_output} from './test_inputs/homework3';
import {hw4_input, hw4_output} from './test_inputs/homework4';
import {hw5_input, hw5_output} from './test_inputs/homework5';
import {cc_input, cc_output} from './test_inputs/custom_contrasts';
import {com_calculate_detail_input, com_calculate_detail_output} from './test_inputs/detail_table';
import {hw5_fullbeta_input, hw5_fullbeta_output} from './test_inputs/homework5_fullbeta';
import {MultipleOutcomeUnirep_input, MultipleOutcomeUnirep_output} from './test_inputs/MultipleOutcomeUnirep';
import {SampleSizeOneSampleTTest_input, SampleSizeOneSampleTTest_output} from './test_inputs/SampleSizeOneSampleTTest';
import {MultipleOutcomeSampleSize_input, MultipleOutcomeSampleSize_output} from './test_inputs/MultipleOutcomeSampleSize';
import {CI_input_1, CI_output_1} from './test_inputs/CI_input_1';
import {CI_input_2, CI_output_2} from './test_inputs/CI_input_2';
import {Gaussian_quantile_1_input, Gaussian_quantile_1_output} from './test_inputs/Gaussian_quantile_1';
import {Gaussian_unconditional_1_input, Gaussian_unconditional_1_output} from './test_inputs/Gaussian_unconditional_1';
import {
  Gaussian_unconditional_50_input,
  Gaussian_unconditional_50_output
} from './test_inputs/Gaussian_unconditional_50';
import {
  Gaussian_unconditional_25_input,
  Gaussian_unconditional_25_output
} from './test_inputs/Gaussian_unconditional_25';
import {powerlib_example1_input, powerlib_example1_output} from './test_inputs/POWERLIB_Example_1';
import {powerlib_example2_input, powerlib_example2_output} from './test_inputs/POWERLIB_Example_2';
import {powerlib_example3_input, powerlib_example3_output} from './test_inputs/POWERLIB_Example_3';
import {powerlib_example4_input, powerlib_example4_output} from './test_inputs/POWERLIB_Example_4';
import {powerlib_example5_input, powerlib_example5_output} from './test_inputs/POWERLIB_Example_5';
import {powerlib_example6_input, powerlib_example6_output} from './test_inputs/POWERLIB_Example_6';
import {powerlib_example7_input, powerlib_example7_output} from './test_inputs/POWERLIB_Example_7';
import {GLMM_F_example7__output, GLMM_F_example7_input} from './test_inputs/GLMM(F)_example7';
import {browser} from 'protractor';

describe('Glimmpse v3 automated integration tests', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    page = new StudyFormComponentPage();
    page.navigateTo('/design/SOLVE_FOR');
    browser.waitForAngularEnabled(false);
  });

  it('Should correctly calculate power using custom contrast matrices', async function () {
    const expected = cc_output;
    await page.fromJSON(cc_input);
    let actual = null;
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });


    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
   expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 4);
  });

  it('Should calculate a power of 1 for Grand Mean with only one outcome', async function() {
    const expected = example_1_output;
    let actual = null;
    let actualPower: number = null;
    let targetPower: number = null;
    let meansScaleFactor: number = null;
    let varianceScaleFactor: number = null;
    let test: string = null;
    let alpha: number = null;

    await page.fromJSON(example_1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    expect(actual.results[0].model).toEqual(expected.model);
    for (let i = 0; i < expected.results.length; i++) {
      await page.power(i).then(power => {
        actualPower = power;
      });
      await page.targetPower(0, example_1_input.solve_for.solve_for).then(power => {
        targetPower = power;
      });
      await page.meansScaleFactor(i).then(scaleFactor => {
        meansScaleFactor = scaleFactor;
      });
      await page.varianceScaleFactor(i).then(scaleFactor => {
        varianceScaleFactor = scaleFactor;
      });
      await page.test(i).then(test_ => {
        test = test_;
      });
      await page.alpha(i).then(alpha_ => {
        alpha = alpha_;
      });

      expect(actualPower).toEqual(expected.results[i].power);
      expect(targetPower).toBeNull();
      expect(meansScaleFactor).toEqual(expected.results[i].means_scale_factor);
      expect(varianceScaleFactor).toEqual(expected.results[i].variance_scale_factor);
      expect(test).toEqual(expected.results[i].test);
      expect(alpha).toEqual(expected.results[i].alpha);
    }
  });

  it('Should fill out the study form: Nonsense example designed to hit every page in glimmpse v3 front end', () => {
    page.fromJSON(generic_model);
  });

  it('O2R2P2C0, Should calculate a power of alpha', async function() {
    const expected = O2R2P2C0_output;
    let actual = null;
    await page.fromJSON(O2R2P2C0_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 4);
    });
  });

  it('HW2, Should return correct power', async function() {
    const expected = hw2_output;
    let actual = null;
    await page.fromJSON(hw2_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW3, Should return correct power', async function() {
    const expected = hw3_output;
    let actual = null;
    await page.fromJSON(hw3_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW4, Should return correct power', async function() {
    const expected = hw4_output;
    let actual = null;
    await page.fromJSON(hw4_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });


    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW5, Should return correct power', async function() {
    const expected = hw5_output;
    let actual = null;
    await page.fromJSON(hw5_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW5 full beta, Should return correct power', async function() {
    const expected = hw5_fullbeta_output;
    let actual = null;
    await page.fromJSON(hw5_fullbeta_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('detail_table, should return the correct value in the detail table.', async function() {
    const expected = com_calculate_detail_output;
    let groupCombination = null;
    let totalSampleSize = null;
    let perGroupSampleSize = null;
    let predictorName = null;

    await page.fromJSON(com_calculate_detail_input);
    await page.calculate();
    page.triggerDetailTable(0);

    for (let i = 0; i < expected.group_combination.length; i++) {
      for (let j = 0; j < expected.group_combination[i].length; j++) {
        await page.groupCombination(i, j).then(groupCombination_ => {
          groupCombination = groupCombination_;
        });
        expect(groupCombination).toEqual(expected.group_combination[i][j]);
      }
    }
    for (let i = 0; i < expected.per_group_sample_size.length; i++) {
      await page.perGroupSampleSize(i).then(perGroupSampleSize_ => {
        perGroupSampleSize = perGroupSampleSize_;
      });
      expect(perGroupSampleSize).toEqual(expected.per_group_sample_size[i]);
    }
    for (let i = 0; i < expected.predictors.length; i++) {
      await page.predictor(i).then(predictorName_ => {
        predictorName = predictorName_;
      });
      expect(predictorName).toEqual(expected.predictors[i].name);
    }
    await page.totalSampleSize().then(totalSampleSize_ => {
      totalSampleSize = totalSampleSize_;
    });
    expect(totalSampleSize).toEqual(expected.totalsamplesize);
  });

  it('Test for Unirep with multiple outcome, Should return correct power', async function() {
    const expected = MultipleOutcomeUnirep_output;
    let actual = null;
    await page.fromJSON(MultipleOutcomeUnirep_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('One sample T Test, should return the correct sample size', async function() {
    const expected = SampleSizeOneSampleTTest_output;
    let actual = null;
    await page.fromJSON(SampleSizeOneSampleTTest_input);

    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('Sample size for multiple outcome, should return the correct sample size', async function() {
    const expected = MultipleOutcomeSampleSize_output;
    let actual = null;
    await page.fromJSON(MultipleOutcomeSampleSize_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('Should correctly calculate power and confidence interval for UNIREP-UN beta known', async function() {
    const expected = CI_output_2;
    page.fromJSON(CI_input_2);
    let actual = null;
    await page.fromJSON(MultipleOutcomeSampleSize_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 4);
    expect(actual.results[0].lower_bound).toBeCloseTo(expected.results[0].lower_bound, 4);
    expect(actual.results[0].upper_bound).toBeCloseTo(expected.results[0].upper_bound, 4);
  });

  it('Should correctly calculate power and confidence interval for HLT beta estimated', async function() {
    const expected = CI_output_1;
    page.fromJSON(CI_input_1);
    let actual = null;
    await page.fromJSON(MultipleOutcomeSampleSize_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 4);
    expect(actual.results[0].lower_bound).toBeCloseTo(expected.results[0].lower_bound, 4);
    expect(actual.results[0].upper_bound).toBeCloseTo(expected.results[0].upper_bound, 4);
  });

  it('Gaussian quantile, should return the correct power', async function() {
    const expected = Gaussian_quantile_1_output;
    let actual = null;
    await page.fromJSON(Gaussian_quantile_1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 3);
    });
  });

  it('Gaussian unconditional, should return the correct power', async function() {
    const expected = Gaussian_unconditional_1_output;
    let actual = null;
    await page.fromJSON(Gaussian_unconditional_1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 3);
    });
  });

  it('Gaussian unconditional repn 25, should return the correct power', async function() {
    const expected = Gaussian_unconditional_25_output;
    let actual = null;
    await page.fromJSON(Gaussian_unconditional_25_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    // for (const r of actual.results) {
    //   for (const i of Object.keys(r.model)) {
    //     const act = r.model[i];
    //     const ex = expected.model[i]
    //     expect(act).toEqual(ex);
    //   }
    // }
    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 3);
    });
  });

  it('Gaussian unconditional repn50, should return the correct power', async function() {
    const expected = Gaussian_unconditional_50_output;
    let actual = null;
    await page.fromJSON(Gaussian_unconditional_50_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 3);
    });
  });

  it('Powerlib Example1, should return the correct power', async function() {
    const expected = powerlib_example1_output;
    let actual = null;
    await page.fromJSON(powerlib_example1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 3);
      }
      });
    });

  it('Powerlib Example2, should return the correct power', async function() {
    const expected = powerlib_example2_output;
    let actual = null;
    await page.fromJSON(powerlib_example2_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 3);
      }
    });
  });

  it('Powerlib Example3, should return the correct power', async function() {
    const expected = powerlib_example3_output;
    let actual = null;
    await page.fromJSON(powerlib_example3_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 3);
      }
    });
  });

  it('Powerlib Example4, should return the correct power', async function() {
    const expected = powerlib_example4_output;
    let actual = null;
    await page.fromJSON(powerlib_example4_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 3);
      }
    });
  });

  it('Powerlib Example5, should return the correct power', async function() {
    const expected = powerlib_example5_output;
    let actual = null;
    await page.fromJSON(powerlib_example5_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 3);
      }
    });
  });

  it('Powerlib Example6, should return the correct power', async function() {
    const expected = powerlib_example6_output;
    let actual = null;
    await page.fromJSON(powerlib_example6_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 5);
        expect(r.lower_bound).toBeCloseTo(e.lower_bound, 4);
        expect(r.upper_bound).toBeCloseTo(e.upper_bound, 5);
      }
    });
  });

  it('Powerlib Example7, should return the correct power', async function() {
    const expected = powerlib_example7_output;
    let actual = null;
    await page.fromJSON(powerlib_example7_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 4);
        expect(r.lower_bound).toBeCloseTo(e.lower_bound, 4);
        expect(r.upper_bound).toBeCloseTo(e.upper_bound, 4);
      }
    });
  });

  it('GLMM(F) Example7, should return the correct power', async function() {
    const expected = GLMM_F_example7__output;
    let actual = null;
    await page.fromJSON(GLMM_F_example7_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });

    actual.results.forEach((result) => {
      let match = false;
      let r = null;
      let e = null;
      expected.results.forEach(exp => {
        if (
          exp.alpha === result.model.alpha
          && exp.mean_scale_factor === result.model.means_scale_factor
          && exp.variability_scale_factor === result.model.variance_scale_factor
          && exp.test === result.test
          && exp.total_N === result.model.total_n) {
          match = true;
          r = result;
          e = exp;
        }
      });
      if (!match) {
        expect(false).toBe(true);
      } else {
        expect(r.power).toBeCloseTo(e.power, 4);
      }
    });
  });
});

