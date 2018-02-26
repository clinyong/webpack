const webpack = require("../../");
const config = require("./config");

webpack(config, err => {
	if (err) console.log(err);
});
