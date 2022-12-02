import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

// first i declare some basic constants and variables. for example, i have a table with the information
// what points each element of rock, paper, scissors gives. i have as well constants that declare how
// many points i get for winning or drawing. these constants contain also a map with the real names of
// the short forms.
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

// totalScore is the score you get for answer 1. totalScore2 is the score you get for answer 2.
let totalScore = 0;
let totalScore2 = 0;

input.forEach((line) => {
	if (line.trim() === "") return;

	// we get the short names from the list and map these to the "real" ones.
	const [a,b] = line.split(" ");
	const oponent = shape[a];
	const you = shape[b];

	// check if it is a draw.
	if (oponent === you) {
		totalScore += scoreForDraw + shapeScore[you];
		return;
	}

	// some basic rock, paper, scissors logic to give out points to the player.
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

// function for getting the element that looses against the given one.
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

// function for getting the element that wins against the given one.
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

	// get both values from the line and get the real element name for the oponent.
	const [a,b] = line.split(" ");
	const oponent = shape[a];

	// if we need to lose (X) we add the score for the loosing shape.
	// if we need to draw (Y) we add the draw points and the score for the shape that we need to have a draw.
	// if we need to win (Z) we add the winning points and the score for the winning shape.
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
