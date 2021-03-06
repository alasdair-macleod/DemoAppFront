## This doc contains all the e2e testing inputs.

- navigation; end2end basic navigation with simple parameters
```javascript
{
    'SOLVE_FOR':
    [
        'samplesize': 20    
    ],

    'TYPE_ONE_ERROR':
    [
        'typeoneerror': 0.01
    ],

    'WITHIN_ISU_OUTCOMES':
    [
        'outcomes': 'simple' 
    ], 

    'PARAMETERS_STANDARD_DEVIATION':
    [
        'input': 2 
    ],
    
    'PARAMETERS_SCALE_FACTOR_VARIANCE':
    [
        'scaleFactors': 1
    ]
}
```

- navigation; 'end2end basic navigation with complex parameters'
```javascript
{
    'MODE': 'guide',

    'TARGET_EVENT': 'reject only',

    'SOLVE_FOR':
    [
        'samplesize': 100 
        'solve for': 'power'   
    ],

    'STATISTICAL_TESTS': 'Hotelling Lawley Trace'

    'TYPE_ONE_ERROR':
    [
        'typeoneerror': 0.01 //default
    ],

    'WITHIN_ISU_OUTCOMES':
    [
        'outcomes': ['bloodpressure', 'weight'] 
    ],
    
    'WITHIN_ISU_REPEATED_MEASURES':
    [
        {
            'Dimension': 'time',
            'Units': 'day',
            'type': 'Numeric', //element(by.cssContainingText('option', 'BeaverBox Testing')).click(); 
            'times': 4,
            'first measure': 1,
            'interval': 2
        },
        {
            'Dimension': 'doctor',
            'Units': '',
            'type': 'categorical', //element(by.cssContainingText('option', 'BeaverBox Testing')).click(); 
            'times': 3,
            'first measure': 1,
            'interval': 1
        }
    ],
    
    'WITHIN_ISU_CLUSTERS':
    [
        'name': 'hospital'
        'level name': ['city', 'state'],
        'elements': [10, 30]
    ],
    
    'BETWEEN_ISU_PREDICTORS':
    [
        {
            'name': 'treatment',
            'groups': ['no dose', 'one dose', 'two dose']
        },
        {
            'name': 'instrument',
            'groups': ['Xray', 'MRI']
        }
    ],

    'BETWEEN_ISU_GROUPS':
    [
        'smallest group': 10
    ],

    'GAUSSIAN_COVARIATE':
    [
        'cov': 1
    ],

    'HYPOTHESIS_EFFECT_CHOICE':
    [
        'effect': 'choose last one'
    ],

    'HYPOTHESIS_WITHIN':
    [
        'time': 'polynomial'
        'doctor': 'global trend'
    ],
    
    'PARAMETERS_STANDARD_DEVIATION':
    [
        'bloodpressure': 15
        'weight': 40
    ],

    'PARAMETERS_OUTCOME_CORRELATION':
    [
        'weight x bloodpressure': 0.7
    ],

    'PARAMETERS_REPEATED_MEASURE_OUTCOME_CORRELATION/bloodpressure/time':
    [
        1: 17,
        2: 16,
        3: 15,
        4: 14
    ],

    'PARAMETERS_REPEATED_MEASURE_OUTCOME_CORRELATION/bloodpressure/doctor':
    [
        1: 1,
        2: 2,
        3: 3
    ],

    'PARAMETERS_REPEATED_MEASURE_OUTCOME_CORRELATION/weight/time':
    [
        1: 50,
        2: 45,
        3: 40,
        4: 34
    ],

    'PARAMETERS_REPEATED_MEASURE_OUTCOME_CORRELATION/weight/doctor':
    [
        1: 30,
        2: 29,
        3: 31
    ],

    'PARAMETERS_REPEATED_MEASURE_CORRELATION/time':
    [
        21: 0.8,
        31: 0.64,
        41: 0.512,
        32: 0.8,
        42: 0.64,
        43: 0.8
    ],

    'PARAMETERS_REPEATED_MEASURE_CORRELATION/doctor':
    [
        21: 0.1,
        31: -0.1,
        32: 0
    ]

    'PARAMETERS_INTRA_CLASS_CORRELATION':
    [
        'state': 0.5,
        'city': 0.6
    ],

    'PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE':
    [
        'variance of your gaussian covariate': 2
    ]

    'PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION': //range -1 to 1, default should be 0
    [
        'bloodpressure': -0.8,
        'weight': 0.9
    ],

    'PARAMETERS_SCALE_FACTOR_VARIANCE':
    [
        'scaleFactors': [1, 2, 0.5]
    ],

    'OPTIONAL_SPECS_POWER_METHOD':
    [
        'mode': 'unconditional'
    ]

    'PARAMETERS_STANDARD_DEVIATION':
    [
        'input': 2 
    ],
    
    'OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES':
    [
        { "_typeIerror": 0.01, "_meanScaleFactor": 1, "_varianceScaleFactor": 1 },
        { "_typeIerror": 0.01, "_meanScaleFactor": 1, "_varianceScaleFactor": 2 }
    ],

    'OPTIONAL_SPECS_CI_CHOICE':
    [
        'define': 'yes'
    ]

    'OPTIONAL_SPECS_CI_ASSUMPTIONS':
    [
        'choice': 'both'
    ]
    
    'OPTIONAL_SPECS_CI_LOWER_TAIL':
    [
        'tail': 0.025
    ],

    'OPTIONAL_SPECS_CI_UPPER_TAIL':
    [
        'tail': 0.025
    ],

    'OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE':
    [
        'sample size': 500
    ],

    'OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK':
    [
        'rank': 5
    ]
}
```

