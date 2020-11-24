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
		res = query[len].search(numPatt);
	}

	if (input.value === "" && query.length < 1) {
		console.log("No input!");
	} else if (res === 0) {
		query.push(symbol);

		if (input.value != "") {
			query.push(input.value);
			input.value = "";
		}
		result.value = query.join(" ");
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
	let operatePatt = /[^.+/*-]/g;
	let res = query[query.length - 1].search(operatePatt);
	console.log(res);

	if (input.value != "" && res == -1) {
		query.push(input.value);
		input.value = "";
	}

	// Check for anything other than operator

	let popped;
	res = query[query.length - 1].search(operatePatt);

	if (res === -1) {
		popped = query.pop();
	}

	if (query.length >= 3) {
		let str = query.join(" ");
		let ans = eval(str);
		result.value = ans;
		query = [];
		query.push(ans.toString());
	}

	if (popped) {
		query.push(popped);
	}
	console.log(query);
}

function reset() {
	console.log("reset called");
	input.value = "";
	result.value = "";
	query = [];
}
