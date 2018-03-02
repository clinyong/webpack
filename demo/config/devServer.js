const { compiler } = require("./webpack");
const path = require("path");
const middleware = require("webpack-dev-middleware");
const express = require("express");
const app = express();

app.use(middleware(compiler));
app.use(require("webpack-hot-middleware")(compiler));

app.get("/", (req, resp) => {
	resp.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(3000, () => console.log("http://localhost:3000"));
