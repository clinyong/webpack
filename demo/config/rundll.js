const webpack = require("../../");
const path = require("path");

const library = "[name]_lib";
const distPath = path.resolve(__dirname, "../dist");
const dllConfig = {
	entry: {
		vendors: [path.resolve(__dirname, "../src/utils/a.js")]
	},

	output: {
		filename: "[name].dll.js",
		path: distPath,
		library
	},
	optimization: {
		minimize: false
	},

	plugins: [
		new webpack.DllPlugin({
			path: path.join(distPath, "[name]-manifest.json"),
			// This must match the output.library option above
			name: library
		})
	]
};

webpack(dllConfig, err => {
	if (err) console.log(err);
});
