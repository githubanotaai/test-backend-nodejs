module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	plugins: ['@typescript-eslint'],
	extends: ['plugin:@typescript-eslint/recommended', 'standard'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		semi: [2, 'always'],
		'space-before-function-paren': [true, 'never'],
	},
};
