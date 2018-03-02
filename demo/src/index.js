import a from "./utils/a";

const app = document.getElementById("app");

if (module.hot) {
	module.hot.accept("./utils/a", function() {
		app.innerText = a;
	});
}
