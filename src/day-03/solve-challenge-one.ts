import { getContents, sumNumericArray } from "../utils";

// node dist/day-03/solve-challenge-one.js <sample|input>
function solveChallengeOne() {
	const lines = getInput(process.argv[2]);

	const jolts: number[] = [];

	lines.forEach((line) => {
		let firstDigit;
		let secondDigit;

		const firstDigitResults = findLargestDigit(line, true);
		firstDigit = firstDigitResults.highest.toString();

		const nextIndex = firstDigitResults.index + 1;
		const restOfString = line.slice(nextIndex);

		const { highest, } = findLargestDigit(restOfString);
		secondDigit = highest.toString();

		const jolt = Number(firstDigit + secondDigit);
		jolts.push(jolt);
	})

	const totalJoltage = sumNumericArray(jolts)

	console.log(`Total joltage: ${totalJoltage}`);
}

function findLargestDigit(line: string, forFirstDigit: boolean = false): { highest: number, index: number } {
	let highest = 0;
	let index = 0;

	const lineLength = line.length;

	for (let i = 0; i < lineLength; i++) {
		if (forFirstDigit && i === lineLength - 1) {
			// Have to save final value for second digit
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

solveChallengeOne();