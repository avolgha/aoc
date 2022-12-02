import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const shapeScore = {
	Rock: 1,
	Paper: 2,
	Scissors: 3,
};
const shape = {
	A: "Rock",
	X: "Rock",
	B: "Paper",
	Y: "Paper",
	C: "Scissors",
	Z: "Scissors",
};
const scoreForDraw = 3;
const scoreForWin = 6;

let totalScore = 0;
let totalScore2 = 0;

input.forEach((line) => {
	if (line.trim() === "") return;

	const [a,b] = line.split(" ");
	const oponent = shape[a];
	const you = shape[b];

	if (oponent === you) {
		totalScore += scoreForDraw + shapeScore[you];
		return;
	}

	if (oponent === "Rock") {
		if (you === "Scissors") {
			totalScore += shapeScore[you];
		} else {
			totalScore += scoreForWin + shapeScore[you];
		}
	} else if (oponent === "Paper") {
		if (you === "Rock") {
			totalScore += shapeScore[you];
		} else {
			totalScore += scoreForWin + shapeScore[you];
		}
	} else {
		if (you === "Paper") {
			totalScore += shapeScore[you];
		} else {
			totalScore += scoreForWin + shapeScore[you];
		}
	}
});

function loosing(oponent) {
	switch (oponent) {
		case "Rock":
			return "Scissors";
		case "Paper":
			return "Rock";
		case "Scissors":
			return "Paper";
	}
}

function winning(oponent) {
	switch (oponent) {
		case "Rock":
			return "Paper";
		case "Paper":
			return "Scissors";
		case "Scissors":
			return "Rock";
	}
}

input.forEach((line) => {
	if (line.trim() === "") return;

	const [a,b] = line.split(" ");
	const oponent = shape[a];

	if (b === "X") {
		totalScore2 += shapeScore[loosing(oponent)];
	} else if (b === "Y") {
		totalScore2 += scoreForDraw + shapeScore[oponent];
	} else {
		totalScore2 += scoreForWin + shapeScore[winning(oponent)];
	}
});

console.log("Answer 1)", totalScore);
console.log("Answer 2)", totalScore2);
