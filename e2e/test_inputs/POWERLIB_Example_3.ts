import {constants} from '../../src/app/shared/model/constants';

// POWERLIB example 3, power for a t-test with 3 dimensional plot

export const powerlib_example3_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.01],
  outcomes: ['Outcome'],
  repeated_measures: null,
  cluster: null,
  predictors: [
    {name: 'group', groups: ['g1', 'g2']}
  ],
  smallest_group: [3, 6, 9, 12, 15, 18],
  groups: [
    {group: '', table: [[1], [1]]},
  ],
  gaussian_covariate: null,
  hypothesis: 'group',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0], [1]]}
  ],
  parameters_scale_factor: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75],
  parameters_standard_deviation: [
    {outcome: 'Outcome', st_dev: 0.2607681}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
};


export const powerlib_example3_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N:  6, power: 0.010961},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N: 12, power: 0.013037},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N: 18, power:  0.01522},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N: 24, power: 0.017472},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N: 30, power: 0.019791},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.05, total_N: 36, power: 0.022176},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N:  6, power: 0.013908},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N: 12, power: 0.022946},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N: 18, power: 0.033177},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N: 24, power: 0.044393},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N: 30, power: 0.056523},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.1, total_N: 36, power: 0.069503},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N:  6, power:  0.01902},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N: 12, power: 0.041956},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N: 18, power: 0.069988},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N: 24, power: 0.102053},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N: 30, power:  0.13741},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.15, total_N: 36, power: 0.175356},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N:  6, power: 0.026578},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N: 12, power: 0.073227},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N: 18, power: 0.133102},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N: 24, power: 0.201533},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N: 30, power: 0.274758},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.2, total_N: 36, power: 0.349567},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N:  6, power: 0.036934},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N: 12, power: 0.119987},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N: 18, power: 0.227246},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N: 24, power: 0.343577},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N: 30, power: 0.458067},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.25, total_N: 36, power: 0.563518},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N:  6, power: 0.050471},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N: 12, power: 0.184412},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N: 18, power: 0.350214},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N: 24, power: 0.512032},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N: 30, power:  0.65078},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.3, total_N: 36, power: 0.759876},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N:  6, power: 0.067563},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N: 12, power: 0.266511},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N: 18, power: 0.491106},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N: 24, power: 0.678132},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N: 30, power: 0.810491},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.35, total_N: 36, power: 0.894631},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N:  6, power: 0.088534},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N: 12, power: 0.363445},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N: 18, power: 0.632841},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N: 24, power:   0.8144},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N: 30, power: 0.914896},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.4, total_N: 36, power: 0.963816},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N:  6, power: 0.113619},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N: 12, power:   0.4696},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N: 18, power: 0.758134},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N: 24, power: 0.907483},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N: 30, power: 0.968763},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.45, total_N: 36, power: 0.990402},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N:  6, power: 0.142931},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N: 12, power: 0.577534},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N: 18, power:  0.85554},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N: 24, power: 0.960459},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N: 30, power:  0.99071},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.5, total_N: 36, power:  0.99805},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N:  6, power: 0.176438},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N: 12, power: 0.679518},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N: 18, power: 0.922187},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N: 24, power: 0.985597},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N: 30, power: 0.997775},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.55, total_N: 36, power: 0.999699},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N:  6, power: 0.213954},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N: 12, power: 0.769146},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N: 18, power: 0.962352},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N: 24, power: 0.995547},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N: 30, power: 0.999573},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.6, total_N: 36, power: 0.999965},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N:  6, power: 0.255135},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N: 12, power: 0.842473},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N: 18, power: 0.983687},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N: 24, power: 0.998835},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N: 30, power: 0.999934},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.65, total_N: 36, power: 0.999997},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N:  6, power: 0.299494},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N: 12, power: 0.898364},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N: 18, power: 0.993684},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N: 24, power: 0.999743},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N: 30, power: 0.999992},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor:  0.7, total_N: 36, power:        1},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N:  6, power: 0.346421},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N: 12, power: 0.938086},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N: 18, power: 0.997818},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N: 24, power: 0.999952},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N: 30, power: 0.999999},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.75, total_N: 36, power:        1}
  ]
};
