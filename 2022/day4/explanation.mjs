import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n").slice(0, -1);

let totalIncludedCount = 0;
let totalOverlapCount = 0;

// the function returns a list of numbers that are in the range between x and y.
// range(1, 4) would produce [1, 2, 3, 4] for example.
function range(x, y) {
	const include = [];
	for (let i = x; i <= y; i++) {
		include.push(i);
	}
	return include;
}


// the function checks if every element of the search array is included in the
// find array.
// check([2, 3], [1, 2, 3, 4]) would produce true because 2 and 3 are located
// in the second array.
function check(search, find) {
	for (const int of search) {
		if (!find.includes(int)) {
			return false;
		}
	}
	return true;
}

// first, we do a bit of magic to get the ranges we require for the solution of this
// challenge.
input
	.map((pair) => pair.split(","))
	.map(([a,b]) => [a.split("-"), b.split("-")])
	.map(([a, b]) => {
		const [a1, a2] = a;
		const [b1, b2] = b;

		return {
			rangeA:  range(parseInt(a1), parseInt(a2)),
			rangeB:  range(parseInt(b1), parseInt(b2)),
		};
	})
	.forEach(({ rangeA, rangeB }) => {
		// we check if any of the both rangers is completely included in the other one.
		if (check(rangeA, rangeB) || check(rangeB, rangeA)) totalIncludedCount++;
		// we check if any element of the first range is included in the second one.
		if (rangeA.filter((element) => rangeB.includes(element)).length > 0) totalOverlapCount++;
	});

console.log("Answer 1)", totalIncludedCount);
console.log("Answer 2)", totalOverlapCount);
