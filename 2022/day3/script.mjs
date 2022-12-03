import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n").slice(0, -1);

let totalScore = 0;
let groupScore = 0;

function scoreForType(element) {
	if (element >= "A" && element <= "Z") {
		return element.charCodeAt(0) - 64 + 26;
	} else if (element >= "a" && element <= "z") {
		return element.charCodeAt(0) - 96;
	}
	throw "should not get here.";
}

input.forEach((line) => {
	const length = line.length;
	const firstPart = line.substring(0, length / 2);
	const secondPart = line.substring(length / 2);

	const _secondPartSplit = secondPart.split("");
	const similarities = [... new Set(firstPart.split("").filter(element => _secondPartSplit.indexOf(element) !== -1))];

	totalScore += similarities.map(scoreForType).reduce((a,b)=>a+b,0);
});

let map = {};
for (let i = 0; i < input.length; i++) {
	new Set(input[i].split("")).forEach((element) => {
		map[element] = (map[element] || 0) + 1;
	});

	if ((i+1) % 3 === 0) {
		const filtered = Object.keys(map).filter((key) => map[key] > 2);
		const [result] = filtered;
		groupScore += scoreForType(result);

		map = {};
	}
}

console.log("Answer 1)", totalScore);
console.log("Answer 2)", groupScore);
