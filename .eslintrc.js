module.exports = {
	'env': {
		'node': true,
		'es2021': true,
		'commonjs': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module',
		'allowImportExportEverywhere': false,
		'ecmaFeatures': {
			'globalReturn': false
		},
		'babelOptions': {
			'configFile': './.babelrc'
		}
	},
	'parser': '@babel/eslint-parser',
	overrides: [
		{
			files: ['**/*.ts'],
			'plugins': ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			rules: {
				'import/no-import-module-exports': 0,
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'error'
			}
		}
	],
	'rules': {
		'no-async-promise-executor': 'off',
		'accessor-pairs': 'off',
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error', 'never'],
		'template-curly-spacing': ['error', 'never'],
		'array-callback-return': 'error',
		'array-element-newline': 'off',
		'arrow-body-style': 'off',
		'arrow-parens': 'off',
		'arrow-spacing': 'error',
		'block-scoped-var': 'error',
		'block-spacing': 'error',
		'camelcase': 'off',
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'capitalized-comments': 'off',
		'class-methods-use-this': 'off',
		'comma-dangle': ['error', 'never'],
		'comma-spacing': 'error',
		'no-empty-pattern': 'off',
		'comma-style': [
			'error',
			'last'
		],
		'complexity': 'off',
		'computed-property-spacing': [
			'error',
			'never'
		],
		'consistent-return': 'off',
		'consistent-this': 'error',
		'curly': 'off',
		'default-case': 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		'dot-location': [
			'error',
			'property'
		],
		'dot-notation': 'warn',
		'eol-last': 'off',
		'eqeqeq': 'off',
		'func-call-spacing': 'error',
		'func-name-matching': 'error',
		'func-names': 'off',
		'func-style': 'off',
		'function-call-argument-newline': [
			'error',
			'consistent'
		],
		'function-paren-newline': 'off',
		'generator-star-spacing': 'error',
		'grouped-accessor-pairs': 'off',
		'guard-for-in': 'off',
		'id-denylist': 'error',
		'id-length': 'off',
		'id-match': 'error',
		'implicit-arrow-linebreak': 'off',
		'indent': 'off',
		'init-declarations': 'off',
		'jsx-quotes': 'error',
		'key-spacing': 'off',
		'keyword-spacing': 'off',
		'line-comment-position': 'off',
		'linebreak-style': [
			'error',
			'unix'
		],
		'lines-around-comment': 'off',
		'lines-between-class-members': 'off',
		'max-classes-per-file': 'error',
		'max-depth': 'error',
		'max-len': 'off',
		'max-lines': 'off',
		'max-lines-per-function': 'off',
		'max-nested-callbacks': 'error',
		'max-params': 'off',
		'max-statements': 'off',
		'max-statements-per-line': 'error',
		'multiline-comment-style': 'off',
		'multiline-ternary': [
			'error',
			'always-multiline'
		],
		'new-cap': ['error', { capIsNew: false }],
		'new-parens': 'error',
		'newline-per-chained-call': 'error',
		'no-alert': 'error',
		'no-case-declarations': 'off',
		'no-array-constructor': 'error',
		'no-await-in-loop': 'off',
		'no-bitwise': 'off',
		'no-caller': 'error',
		'no-confusing-arrow': 'off',
		'no-console': 'off',
		'no-constructor-return': 'error',
		'no-continue': 'off',
		'no-div-regex': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'off',
		'no-empty-function': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-extra-parens': 'off',
		'no-floating-decimal': 'error',
		'no-implicit-coercion': ['error', { allow: ['~'] }],
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-inline-comments': 'off',
		'no-invalid-this': 'off',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'off',
		'no-loss-of-precision': 'error',
		'no-magic-numbers': 'off',
		'no-mixed-operators': 'off',
		'no-multi-assign': 'error',
		'no-multi-spaces': 'off',
		'no-multi-str': 'error',
		'no-multiple-empty-lines': 'off',
		'no-negated-condition': 'off',
		'no-nested-ternary': 'off',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-octal-escape': 'error',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-promise-executor-return': 'off',
		'no-proto': 'error',
		'no-restricted-exports': 'error',
		'no-restricted-globals': 'error',
		'no-restricted-imports': 'error',
		'no-restricted-properties': 'error',
		'no-restricted-syntax': 'error',
		'no-return-assign': 'error',
		'no-return-await': 'off',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-template-curly-in-string': 'error',
		'no-ternary': 'off',
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'off',
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-underscore-dangle': 'off',
		'no-unmodified-loop-condition': 'error',
		'no-unneeded-ternary': 'error',
		'no-unreachable-loop': 'off',
		'no-unreachable': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-unused-expressions': 'off',
		'no-use-before-define': 'off',
		'no-useless-backreference': 'error',
		'no-useless-call': 'off',
		'no-useless-computed-key': 'off',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-void': 'off',
		'no-warning-comments': 'off',
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': [
			'error',
			'any'
		],
		'object-curly-newline': 'error',
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': 'off',
		'object-shorthand': 'off',
		'one-var': 'off',
		'one-var-declaration-per-line': 'error',
		'operator-assignment': [
			'error',
			'always'
		],
		'operator-linebreak': 'off',
		'padded-blocks': 'off',
		'padding-line-between-statements': 'error',
		'prefer-arrow-callback': 'error',
		'no-irregular-whitespace': 'warn',
		'prefer-const': 'off',
		'prefer-destructuring': 'off',
		'prefer-exponentiation-operator': 'error',
		'prefer-named-capture-group': 'off',
		'prefer-numeric-literals': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-regex-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'off',
		'quote-props': 'off',
		'quotes': ['error', 'single', { allowTemplateLiterals: true }],
		'radix': [
			'error',
			'as-needed'
		],
		'require-atomic-updates': 'off',
		'require-await': 'off',
		'require-unicode-regexp': 'off',
		'rest-spread-spacing': [
			'error',
			'never'
		],
		'semi': 'off',
		'semi-spacing': [
			'error',
			{
				'after': true,
				'before': false
			}
		],
		'semi-style': 'off',
		'sort-keys': 'off',
		'sort-vars': 'error',
		'space-before-blocks': 'off',
		'space-before-function-paren': ['error', { asyncArrow: 'always', named: 'never', anonymous: 'never' }],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'off',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always', { 'block': { 'balanced': true } }],
		'strict': 'error',
		'switch-colon-spacing': 'error',
		'symbol-description': 'error',
		'template-tag-spacing': 'error',
		'unicode-bom': [
			'error',
			'never'
		],
		'vars-on-top': 'error',
		'wrap-iife': 'error',
		'wrap-regex': 'error',
		'yield-star-spacing': 'error',
		'yoda': [
			'error',
			'never'
		]
	}
};
