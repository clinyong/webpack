const webpack = require("../../");
const path = require("path");

const config = {
	entry: path.resolve(__dirname, "../src/index.js"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.js"
	},
	optimization: {
		minimize: false
	},
	plugins: [
		new webpack.DllReferencePlugin({
			manifest: require("../dist/vendors-manifest.json")
		})
	]
};

webpack(config, err => {
	if (err) console.log(err);
});
