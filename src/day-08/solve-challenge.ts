import { getContents } from "../utils";

// node dist/day-08/solve-challenge.js <sample|input>
function solveChallenge() {
	const input = getInput(process.argv[2]);

	input.forEach((input_line) => {
	});

	console.log(`Solution is: UNKNOWN`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-08/${source}.txt`;
	return getContents(inputPath, null, ',');
}

solveChallenge();