import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

// we have two variables. one of them stores the 3 highest values that we need later on
// for the second question. the other variable holds the currently calculated sum of
// calories.
let highest = [];
let sum = 0;

input.forEach((string) => {
	// check if we have a blank line
	if (string === "") {
		// we push our sum on the highest values stack. then we sort this stack from the lowest
		// to the highest and reverse it to have the highest in the front. then we slice it up
		// so we have the 3 highest sums.
		// After all, we can reset the sum to zero.
		highest.push(sum);
		highest = highest.sort().reverse().slice(0, 3);

		sum = 0;
		return;
	}

	// just parse the input as an integer and add it to the sum
	const integer = parseInt(string);
	sum += integer;
});

// we sort the list so the highest sum is at the back of the array. we know that we only
// have 3 values in the array so we can set 2 as the index for the last element in the array.
console.log("Answer 1)", highest.sort()[2]);

// we use a simple reduce function to get the sum of all elements in the array.
console.log("Answer 2)", highest.reduce((prev,curr) => prev + curr, 0));
