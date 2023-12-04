import antfu from '@antfu/eslint-config'

export default await antfu({
  rules: {
    'curly': ['error', 'multi-line'],
    'eqeqeq': 'off',
    'no-console': 'off',
    'style/brace-style': ['warn', '1tbs'],
  },
})
