import {constants} from '../../src/app/shared/constants';

export const example_1_input = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.REJECT_NULL,
  solve_for: {solve_for: constants.SOLVE_FOR.POWER},
  statistical_tests: [
    constants.STATISTICAL_TESTS.HUYNH_FELDT
  ],
  type_one_error: 0.05,
  outcomes: ['bp'],
  repeated_measures: null,
  cluster: null,
  predictors: null,
  smallest_group: 10,
  groups: null,
  gaussian_covariate: null,
  hypothesis: null,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[80]]}
    ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'bp', st_dev: 15}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
}

export const example_1_output = {
  message: "OK",
  status: 200,
  mimetype: "application/json",
  results: [
    {
      test: "Hotelling Lawley Trace",
      power: 1.0
    }],
  model: {
    essence_design_matrix: [ [ 1 ] ],
    repeated_rows_in_design_matrix: 10,
    hypothesis_beta: [ [ 80 ] ],
    c_matrix: [ [ 1 ] ],
    u_matrix: [ [ 1 ] ],
    sigma_star: [ [ 225 ] ],
    theta_zero: [ [ 0 ] ],
    alpha: 0.05,
    total_n: 10,
    theta: [ [ 80 ] ],
    m: [ [ 1 ] ],
    nu_e: 9,
    hypothesis_sum_square: [ [ 64000 ] ],
    error_sum_square: [ [ 2025 ] ]
  }
}