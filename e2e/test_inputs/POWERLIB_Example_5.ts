import {constants} from '../../src/app/shared/model/constants';

// Example4 -- Test in multivariate model with two within factors;


export const powerlib_example5_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.BOX_CORRECTION,
    constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE,
    constants.STATISTICAL_TESTS.HUYNH_FELDT
  ],
  type_one_error: [0.04],
  outcomes: ['outcome1'],
  repeated_measures: [
    {dimension: 'repm1', units: 'dkn', type: constants.REPEATED_MEASURE_TYPES[1], values: [0, 1, 2]},
    {dimension: 'repm2', units: 'dkn', type: constants.REPEATED_MEASURE_TYPES[1], values: [1, 2, 3]}
  ],
  cluster: null,
  predictors: null,
  smallest_group: [20],
  groups: null,
  gaussian_covariate: null,
  hypothesis: 'repm1 x repm2',
  definefullbeta: null,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0.1133287, 0.0714337, -0.184762, -0.184762, 0.1133287, 0.0714337, 0.0714337, -0.184762, 0.1133287]]}
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'outcome1', st_dev: 1}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null],
        [ 0.4, null, null],
        [ 0.4,  0.4, null]
      ]}
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.5, 1, 2],
  power_method: null,
  power_curve: null
};


export const powerlib_example5_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.019},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.039},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.066},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.242},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power: 0.202},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power: 0.683},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power: 0.451},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power: 0.955},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.014},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.022},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.032},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.089},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.077},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.287},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power:  0.17},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.607},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power:  0.02},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power:  0.04},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.068},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.224},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power:  0.18},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power:  0.58},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power: 0.344},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power: 0.849},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.015},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.022},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.033},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.088},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.078},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.262},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.156},
    {test: 'Pillai-Bartlett Trace', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.518},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.021},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.041},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.075},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.247},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power: 0.218},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power:  0.66},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power:  0.45},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power: 0.929},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.015},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.023},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.035},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.094},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.087},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.291},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.186},
    {test: 'Wilks Likelihood Ratio', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power:  0.59},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.002},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.006},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.011},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.076},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power:  0.06},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power: 0.413},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power: 0.215},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power: 0.849},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.001},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.003},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.004},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.018},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.014},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.099},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.047},
    {test: 'Box Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.333},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.016},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.037},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.065},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.249},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power: 0.221},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power: 0.709},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power: 0.509},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power: 0.966},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.011},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power:  0.02},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.028},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.089},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.076},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.298},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.184},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.631},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.021},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.042},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.081},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.266},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power: 0.259},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power: 0.727},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power:  0.56},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power:  0.97},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.015},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.023},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.037},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.097},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.095},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.316},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.218},
    {test: 'Huynh-Feldt Corrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.651},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 20, power: 0.021},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 40, power: 0.042},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 20, power: 0.081},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 40, power: 0.266},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 20, power: 0.259},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 40, power: 0.727},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 20, power:  0.56},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 40, power:  0.97},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 20, power: 0.015},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 0.5, total_N: 40, power: 0.023},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 20, power: 0.037},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   1, total_N: 40, power: 0.097},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 20, power: 0.095},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor: 1.5, total_N: 40, power: 0.316},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 20, power: 0.218},
    {test: 'Uncorrected', alpha: 0.01, variability_scale_factor: 2, mean_scale_factor:   2, total_N: 40, power: 0.651}
  ]
};
