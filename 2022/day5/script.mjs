import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const _default = [];
let base = [];
let base2 = [];
const moves = [];

let cargoResult9000 = "";
let cargoResult9001 = "";

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
			if (result === null) return;
			const [_, amount, from, to] = result;
			moves.push({ amount: parseInt(amount), from: parseInt(from), to: parseInt(to), line, });
		});
}

function getStart(lines) {
	lines.pop();

	rotate(lines.map((line) => line.replaceAll(/[\[\]]/g, " ").trim().replaceAll(/\s{3}/g, " "))).forEach((line) => {
		const oneString = line.join("").trim();
		if (oneString === "") return;
		_default.push(oneString.split(""));
	});

	base = JSON.parse(JSON.stringify(_default));
	base2 = JSON.parse(JSON.stringify(_default));
}

(function solve() {
	const breakLineIndex = input.findIndex((value) => value.trim() === "");
	getStart(input.slice(0, breakLineIndex));
	getMoves(input.slice(breakLineIndex + 1));

	function sim(container, reversePush) {
		for (const move of moves) {
			const { amount, from, to } = move;

			const _arr = container[from - 1];
			const firstArrayPart = _arr.slice(0, -amount);
			const secondArrayPart = _arr.slice(-amount);

			container[from - 1] = firstArrayPart;

			if (reversePush === undefined || reversePush === true) {
				container[to - 1].push(...secondArrayPart.reverse());
			} else {
				container[to - 1].push(...secondArrayPart);
			}
		}

		return container;
	}

	sim(base)
		.map((line) => line.reverse()[0] || "")
		.forEach((element) => cargoResult9000 += element);

	sim(base2, false)
		.map((line) => line.reverse()[0] || "")
		.forEach((element) => cargoResult9001 += element);

	console.log("Answer 1)", cargoResult9000);
	console.log("Answer 2)", cargoResult9001);
})();
