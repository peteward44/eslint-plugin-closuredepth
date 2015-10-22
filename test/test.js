"use strict";

var rule = require("../rules/closuredepth.js");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

ruleTester.run("closuredepth", rule, {
	valid: [
		"function name() { var monkey = 33; }",
		"function name() { var monkey = 33; } function name2() { var monkey2 = 55; }",
		"function name() { function name2() { var monkey = 33; } }",
		"function name() { function name2() { var monkey = 33; } function name3() { var monkey2 = 55; } }",
		"function name() { function name2() { var monkey = 33; } function name3() { var monkey2 = 55; } } function name4() { function name5() { var monkey = 33; } function name6() { var monkey2 = 55; } }"
	],

	invalid: [
		{
			code: "function name() { function name2() { function name3() { var monkey = 33; } } }",
			errors: [ { message: "closure depth exceeded limit of 2" } ]
		},
		{
			code: "function name() { function name2() { function name3() { var monkey = 33; } function name4() { var monkey2 = 44; } } }",
			errors: [ { message: "closure depth exceeded limit of 2" }, { message: "closure depth exceeded limit of 2" } ]
		}
	]
});
