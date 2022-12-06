// NOTE: this day was really simple, not gonna lie.

import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8");

// this function is our algorithm that solves the question.
// the parameter `step` is just the amount of characters required
// for the current "packet".
function solve(step) {
	let marker = "";
	let position = -1;

	// we start iterating on the first position where the marker can be
	// detected
	for (let i = step; i < input.length; i++) {
		// we set the marker to the last `step` characters.
		marker = input.slice(i - step, i);

		// we check if we have only unique characters.
		const unique = new Set(marker.split(""));
		if (unique.size === step) {
			position = i;
			break;
		}
	}

	return position;
}

console.log("Answer 1)", solve(4));
console.log("Answer 2)", solve(14));
