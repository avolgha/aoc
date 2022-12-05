import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

// we have 4 arrays:
// - `_default` stores the input array. we use default only when we want to create a new array with the puzzle input.
// - `base` stores the input for the first solution.
// - `base2` stores the input for the second solution.
// - `moves` stores all the moves that should be performed later on.
const _default = [];
let base = [];
let base2 = [];
const moves = [];

let cargoResult9000 = "";
let cargoResult9001 = "";

// this function rotates the input lines.
// i personally don't really know how that works but hey! it works!
function rotate(arr) {
	const temp = [];

	for (let x = 0; x < arr.length; x++) {
		for (let y = 0; y < arr[x].length; y++) {
			if (!temp[y]) temp[y] = []
			temp[y][x] = arr[x][y];
		}
	}

	return temp.map((line) => line.reverse());
}

// this function retrieves the moves from the input.
function getMoves(lines) {
	// little story to the line. i finished my script at like 12 o'clock. than i ran it and the answer was not accpeted by AOC.
	// i tried to find the error in my code for 2 hours. i replaced everything but thought that the error was in the move handler.
	// after 2 hours, i added a debug log to the `result === null` check where i printed every false regex.
	// after 2 HOURS i finally found out, that my regex did only accept 1 chacter numbers...
	// so kids, check your regex before you run the code.
	const regex = /move (\d+) from (\d+) to (\d+)/;
	lines
		.map((line) => ({ result: regex.exec(line), line }))
		.forEach(({result, line}) => {
			// we get the result through the regex and that put it as an object in the `moves`-array.
			if (result === null) return;
			const [_, amount, from, to] = result;
			moves.push({ amount: parseInt(amount), from: parseInt(from), to: parseInt(to), line, });
		});
}

// this function tries to parse the input values from the input.
// i think it could be made better but i don't want to do it.
// what we do is rotating the input so that we can put the input as arrays. the code for that is really ugly and uses regexs
// and weird transforms everywhere.
// don't understand the function? neither do i as i read this comment.
function getStart(lines) {
	lines.pop();

	rotate(lines.map((line) => line.replaceAll(/[\[\]]/g, " ").trim().replaceAll(/\s{3}/g, " "))).forEach((line) => {
		const oneString = line.join("").trim();
		if (oneString === "") return;
		_default.push(oneString.split(""));
	});

	// we have to REALLY clone these arrays. else, we have overlapping and we don't want that for sure.
	base = JSON.parse(JSON.stringify(_default));
	base2 = JSON.parse(JSON.stringify(_default));
}

(function solve() {
	const breakLineIndex = input.findIndex((value) => value.trim() === "");
	getStart(input.slice(0, breakLineIndex));
	getMoves(input.slice(breakLineIndex + 1));

	// this function similates the whole game-loop. it gets an container and an option as input.
	// the container stores the input values and the option determines if we reverse the input
	// when we change its location. that option is only important when executing it for question
	// one or two.
	function sim(container, reversePush) {
		for (const move of moves) {
			const { amount, from, to } = move;

			// split the array in two halfs
			const _arr = container[from - 1];
			const firstArrayPart = _arr.slice(0, -amount);
			const secondArrayPart = _arr.slice(-amount);

			// push the parts to their locations.
			container[from - 1] = firstArrayPart;
			if (reversePush === undefined || reversePush === true) {
				container[to - 1].push(...secondArrayPart.reverse());
			} else {
				container[to - 1].push(...secondArrayPart);
			}
		}

		return container;
	}

	// finally, we just have to call the similation twice to get the results.
	// we get the element on top of the stack by reversing the array and retrieving its
	// first value.
	// (we could just use `.at(-1)` but i am lazy and i don't want to rewrite the code.)

	sim(base)
		.map((line) => line.reverse()[0] || "")
		.forEach((element) => cargoResult9000 += element);

	sim(base2, false)
		.map((line) => line.reverse()[0] || "")
		.forEach((element) => cargoResult9001 += element);

	console.log("Answer 1)", cargoResult9000);
	console.log("Answer 2)", cargoResult9001);
})();
