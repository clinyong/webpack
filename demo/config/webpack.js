const webpack = require("../../");
const path = require("path");

const config = {
	entry: {
		index: ["webpack-hot-middleware/client", path.resolve(__dirname, "../src/index.js")]
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js"
	},
	optimization: {
		minimize: false,
		concatenateModules: false
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	mode: "development"
};

exports.compiler = webpack(config);
