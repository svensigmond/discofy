module.exports = {
	extends: 'vi',
	root: true,
	env: {
		jasmine: true
	},

	rules: {
		'max-len': ['error', 100, 4, { ignoreComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
		'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }]
	}
};
