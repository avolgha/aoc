import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8");

function solve(step) {
	let marker = "";
	let position = -1;

	for (let i = step; i < input.length; i++) {
		marker = input.slice(i - step, i);

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
