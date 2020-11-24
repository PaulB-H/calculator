"use strict";
console.clear();

const input = document.getElementById("numinput");
input.focus();
const result = document.getElementById("resultdiv");
input.value = "";
result.value = "";

let query = [];

function operate(symbol) {
	let numPatt = /[0-9]/g;
	let len = query.length - 1;
	let res;

	if (len >= 0) {
		// string.search(pattern) returns -1 if no match
		// or the index num of the first match in string
		res = query[len].search(numPatt);
		console.log(res);
	}

	if (input.value === "" && query.length < 1) {
		console.log("No input!");
		// If last query item is num, push symbol first
	} else if (res === 0 || res === 1) {
		query.push(symbol);

		if (input.value != "") {
			query.push(input.value);
			input.value = "";
		}
		result.value = query.join(" ");

		// Else push the input number first
	} else {
		if (input.value != "") {
			query.push(input.value);
			input.value = "";
			query.push(symbol);
			result.value = query.join(" ");
		}
	}
	input.focus();
	console.log(query);
}

function solve() {
	// Check for anything OTHER than operator
	// Returns -1 if operator found, 0 otherwise
	let operatePatt = /[^.+/*-]/g;
	let res;
	if (query[query.length - 1] != undefined) {
		res = query[query.length - 1].search(operatePatt);
		console.log(res);
	}
	// If input is NOT empty
	// AND
	// last item in query is an operator
	if (input.value != "" && res == -1) {
		query.push(input.value);
		input.value = "";
	}

	let popped;
	if (query[query.length - 1] != undefined) {
		res = query[query.length - 1].search(operatePatt);
	}
	// If last array item is operator, pop it off before running eval
	if (res === -1) {
		popped = query.pop();
	}
	result.value = query; // Update view if we tossed trailing operator

	if (query.length >= 3) {
		let str = query.join(" ");
		let ans = eval(str);
		result.value = ans;
		query = [];
		query.push(ans.toString());
		// if (popped) {
		// 	query.push(popped);
		// }
	}
	input.focus();
	console.log(query);
}

function reset() {
	console.log("reset called");
	input.value = "";
	result.value = "";
	query = [];
	input.focus();
}

function numpad(num) {
	let numinput = document.getElementById("numinput");
	let pattern = /[.]+/g;
	let decimals = [];
	decimals = numinput.value.match(pattern);
	console.log(decimals);
	if (decimals != null) {
		if (decimals.length <= 1 && num != ".") {
			numinput.value += num;
		}
	} else {
		numinput.value += num;
	}
	// console.log(decimals.length);
	// if (decimals.length <= 1 && num != ".") {
	// 	numinput.value += num;
	// }
}

document.getElementById("numinput").addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		console.log("Enter pressed");
		solve();
	}
});
