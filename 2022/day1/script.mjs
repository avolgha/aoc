import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

let highest = [];
let sum = 0;

input.forEach((string) => {
	if (string.trim() === "") {
		highest.push(sum);
		highest = highest.sort().reverse().slice(0, 3);

		sum = 0;
		return;
	}

	const integer = parseInt(string);
	sum += integer;
});

console.log("Answer 1)", highest.sort()[2]);
console.log("Answer 2)", highest.reduce((prev,curr) => prev + curr, 0));
