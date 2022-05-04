module.exports = {
	content: ['build/**/!(*.css)'],
	css: ['build/_app/assets/*.css'],
	output: 'build/_app/assets/',

	safelist: ['theme--dark', 'theme--light', 'size-default'],
	defaultExtractor: (content) => content.match(/[\w-/:[\]]+(?<!:)/g) || [],

	variables: true,
	fontFace: true,
	keyframes: true,
};
