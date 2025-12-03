import { getContents, sumANumericArray } from "../utils/get-contents";

// node dist/day-three/solve-challenge.js sample
function solveChallenge() {
	const lines = getInput(process.argv[2]);

	const jolts: number[] = [];

	lines.forEach((line) => {
		let firstDigit;
		let secondDigit;

		console.log(`line: ${line}`);

		const firstDigitResults = findLargestDigit(line, true);
		firstDigit = firstDigitResults.highest.toString();
		console.log(`first: ${firstDigit}`);

		const nextIndex = firstDigitResults.index + 1;
		const restOfString = line.slice(nextIndex);
		console.log(`restOfString: ${restOfString}`);

		const { highest, } = findLargestDigit(restOfString);
		secondDigit = highest.toString();
		console.log(`second: ${secondDigit}`);

		const jolt = Number(firstDigit + secondDigit);
		console.log(`jolt: ${jolt}`);
		jolts.push(jolt);
	})

	const totalJoltage = sumANumericArray(jolts)

	// 17280 too high
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
			if (highest === 9) {
				index = i;
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
	const inputPath = `src/day-three/${source}.txt`;
	return getContents(inputPath);
}

solveChallenge();