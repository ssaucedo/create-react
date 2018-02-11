module.exports = {
  parser: 'babel-eslint',
  'rules': {
    'max-len': [1, 120, 2, {ignoreComments: true}],
    'prop-types': [2]
  },
  "globals": {
    "window": true,
  },
  'extends': ['airbnb-base', 'plugin:react/recommended']
}

