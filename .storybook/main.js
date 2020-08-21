// module.exports = {
//   "stories": [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-actions",
// 		"@storybook/addon-viewport",
// 		"@storybook/addon-knobs",
// 		"@storybook/addon-docs",
// 		"@storybook/addon-a11y",
// 		"@storybook/addon-storysource",
//   ]
// }



module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
	addons: [
		"@storybook/preset-create-react-app",
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-viewport",
		"@storybook/addon-knobs",
		{ name: "@storybook/addon-docs", options: { configureJSX: true } },
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [

				{
					loader: require.resolve("react-docgen-typescript-loader"),
					options: {
						shouldExtractLiteralValuesFromEnum: true,
						propFilter: (prop) => {
							if (prop.parent) {
								return !prop.parent.fileName.includes(
									"node_modules"
								);
							}
							return true;
						},
					},
				},

				// ,
				// {
				// 	loader: require.resolve("react-docgen-typescript-loader"),
				// },
			],
		});
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
};