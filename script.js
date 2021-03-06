"use strict";
console.clear();

const input = document.getElementById("numinput");
// input.focus();
const result = document.getElementById("resultdiv");
input.value = "";
result.value = "";
let decimalbutton = document.getElementById("decimalbutton");
let decimalQue = false;

let query = [];

function operate(symbol) {
	let numPatt = /[0-9]/g;
	let len = query.length - 1;
	let res;

	if (len >= 0) {
		// string.search(pattern) returns -1 if no match
		// or the index num of the first match in string
		res = query[len].search(numPatt);
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
	// input.focus(); maybe add this on external keyboard only
}

function solve() {
	// Check for anything OTHER than operator
	// Returns -1 if operator found
	let operatePatt = /[^.+/*-]/g;
	let res;
	if (query[query.length - 1] != undefined) {
		res = query[query.length - 1].search(operatePatt);
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
}

function reset() {
	input.value = "";
	result.value = "";
	query = [];
	decimalQue = false;
	decimalbutton.style.background = "";
}

function numpad(num) {
	if (num === 0 && input.value.length === 0 && decimalQue === false) {
		// Do nothing
	} else {
		if (decimalQue) {
			input.value += "." + num;
			decimalQue = false;
			decimalbutton.style.background = "";
		} else {
			input.value += num;
		}
	}
}

function decimal() {
	let decimalPatt = /[.]+/g;
	let decimals = input.value.search(decimalPatt);
	if (decimalQue) {
		decimalQue = false;
		decimalbutton.style.background = "";
	} else if (decimals === -1) {
		decimalQue = true;
		decimalbutton.style.background = "#ffff8f";
	}
}

function negate() {
	if (input.value != 0) {
		input.value *= -1;
	}
}

document.getElementById("numinput").addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		solve();
	}
});
