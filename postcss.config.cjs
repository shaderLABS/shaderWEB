const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// FIXME: Temporary workaround which prevents esbuild from freezing while building.
var charsetRemoval = () => {
	return {
		postcssPlugin: 'internal:charset-removal',
		AtRule: {
			charset: (atRule) => {
				if (atRule.name === 'charset') {
					atRule.remove();
				}
			},
		},
	};
};

const config = {
	plugins: [charsetRemoval(), tailwindcss(), autoprefixer()],
};

module.exports = config;
