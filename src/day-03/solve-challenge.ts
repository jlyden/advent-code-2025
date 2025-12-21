import { getContents, sumNumericArray } from "../utils";

// node dist/day-03/solve-challenge.js <sample|input> 2|12
function solveChallenge() {
	const lines = getInput(process.argv[2]);
	const battsCount = Number(process.argv[3]);

	const jolts: number[] = [];

	lines.forEach((line) => {
		let digits = '';

		let remainingLine = line;
		for (let battsNeeded = battsCount; battsNeeded > 0; battsNeeded--) {
			const { highest, index } = findLargestDigit(remainingLine, battsNeeded);
			digits += highest.toString();
			const nextIndex = index + 1;
			remainingLine = remainingLine.slice(nextIndex);
			if (remainingLine === '') break;
		}

		const jolt = Number(digits);
		jolts.push(jolt);
	})

	const totalJoltage = sumNumericArray(jolts)

	console.log(`Total joltage: ${totalJoltage}`);
}

function findLargestDigit(line: string, battsNeeded: number): { highest: number, index: number } {
	if (line === '') {
		throw new Error('no more line to search');
	}

	let highest = 0;
	let index = 0;

	const lineLength = line.length;
	for (let i = 0; i < lineLength; i++) {
		if (i === (lineLength - battsNeeded + 1)) {
			// Save values for later digits
			break;
		}
		const digit = Number(line[i]);
		if (digit > highest) {
			highest = digit;
			index = i;
			if (highest === 9) {
				break;
			} 
		}
	}

	return {
		highest,
		index,
	};
}

function getInput(source: string): string[] {
	const inputPath = `src/day-03/${source}.txt`;
	return getContents(inputPath);
}

solveChallenge();