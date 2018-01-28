/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DllEntryDependency = require("./dependencies/DllEntryDependency");
const SingleEntryDependency = require("./dependencies/SingleEntryDependency");
const DllModuleFactory = require("./DllModuleFactory");

class DllEntryPlugin {
	constructor(context, entries, name) {
		this.context = context;
		this.entries = entries;
		this.name = name;
	}

	apply(compiler) {
		compiler.plugin("compilation", (compilation, params) => {
			// first run
			const dllModuleFactory = new DllModuleFactory();
			const normalModuleFactory = params.normalModuleFactory;

			compilation.dependencyFactories.set(DllEntryDependency, dllModuleFactory);

			// QA: 这里的 SingleEntryDependency 会不会在其它地方设置过。也就是有可能 SingleEntryDependency 已经对应了 factory。
			compilation.dependencyFactories.set(SingleEntryDependency, normalModuleFactory);
		});
		compiler.plugin("make", (compilation, callback) => {
			// second run
			compilation.addEntry(this.context, new DllEntryDependency(this.entries.map((e, idx) => {
				const dep = new SingleEntryDependency(e);
				dep.loc = `${this.name}:${idx}`;
				return dep;
			}), this.name), this.name, callback);
		});
	}
}

module.exports = DllEntryPlugin;
