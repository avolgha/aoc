import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n").slice(0, -1);

// define the resulting two variables.
let totalScore = 0;
let groupScore = 0;

// function to get the score for an element.
// this works by getting the ASCII code for the string of the element and doing some
// calculations that result in the given requirements for the scoreing of the elements.
function scoreForType(element) {
	if (element >= "A" && element <= "Z") {
		return element.charCodeAt(0) - 64 + 26;
	} else if (element >= "a" && element <= "z") {
		return element.charCodeAt(0) - 96;
	}
	throw "should not get here.";
}

input.forEach((line) => {
	// we split the string into two same-length strings
	const length = line.length;
	const firstPart = line.substring(0, length / 2);
	const secondPart = line.substring(length / 2);

	// we finding the similarities between the first and the second half of the string.
	// this is done by splitting both strings and then finding identical elements where
	// we then remove duplicates. then we can get the score for each element and add it
	// to the final sum.
	const _secondPartSplit = secondPart.split("");
	const similarities = [... new Set(firstPart.split("").filter(element => _secondPartSplit.indexOf(element) !== -1))];

	totalScore += similarities.map(scoreForType).reduce((a,b)=>a+b,0);
});

let map = {};
for (let i = 0; i < input.length; i++) {
	// we create a list of non-duplicate characters from the input. then we
	// iterate over that set and setting a counter in the `map` variable.
	// this is done because we want to check later which element is the most
	// present one (or that has more than 2 locations).
	new Set(input[i].split("")).forEach((element) => {
		map[element] = (map[element] || 0) + 1;
	});

	// if we have the third line (because of 3-line grouping)
	if ((i+1) % 3 === 0) {
		// we get the element that is in every string at least once.
		const filtered = Object.keys(map).filter((key) => map[key] > 2);
		const [result] = filtered;
		groupScore += scoreForType(result);

		// we reset the map because we finished with this group.
		map = {};
	}
}

console.log("Answer 1)", totalScore);
console.log("Answer 2)", groupScore);
