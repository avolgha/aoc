import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n").slice(0, -1);

let totalIncludedCount = 0;
let totalOverlapCount = 0;

function range(x, y) {
	const include = [];
	for (let i = x; i <= y; i++) {
		include.push(i);
	}
	return include;
}


function check(search, find) {
	for (const int of search) {
		if (!find.includes(int)) {
			return false;
		}
	}
	return true;
}

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
		if (check(rangeA, rangeB) || check(rangeB, rangeA)) totalIncludedCount++;
		if (rangeA.filter((element) => rangeB.includes(element)).length > 0) totalOverlapCount++;
	});

console.log("Answer 1)", totalIncludedCount);
console.log("Answer 2)", totalOverlapCount);
