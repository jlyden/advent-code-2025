import { getContents, sumNumericArray } from "../utils";

type ValuesToIndexes = { [key:string] : number[] };
const DIGITS = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];

// node dist/day-03/solve-challenge-two.js <sample|input> <batteryCount>
function solveChallengeTwo() {
	const lines = getInput(process.argv[2]);
	const batteryCount = Number(process.argv[3]) ?? 2;

	const jolts: number[] = [];

	lines.forEach((line) => {
		console.log(`line: ${line}`);
		const batteries: string[] = [];
		const valuesToIndexes = buildValuesIndexesMap(line);
		let minIndex = 0;

		const lastIndexInLine = line.length - 1;
		const digitCount = 9;
		for (let i = 0; i < digitCount; i++) {
			if (batteries.length === batteryCount) {
				break;
			}

			const digit = DIGITS[i];
			console.log(`digit: ${digit}`);

			const indexesForDigit = valuesToIndexes[digit];
			console.log(`indexesForDigit: ${indexesForDigit}`);

			// line does not include digit
			if (!indexesForDigit) {
				continue;
			}

			const indexCount = indexesForDigit.length;
			for (let j = 0; j < indexCount; j++) {
				const digitIndex = indexesForDigit[j];
				if (digitIndex < minIndex) {
					// Can't use this one, already past it in line - look for a larger one
					continue;
				}

				const maxDigitIndexPossible = lastIndexInLine - batteryCount + batteries.length;
				if (digitIndex > maxDigitIndexPossible) {
					// TODO: this is wrong approach - can't use now, might be able to use later
					// Can't use this one, will run out of room for rest of batteries
					// and all larger ones will also be too big
					break;
				}

				batteries.push(digit);
				if (batteries.length === batteryCount) {
					break;
				}

				minIndex = j;
			}
		}

		const jolt = Number(batteries.join(''));
		console.log(`jolt: ${jolt} for line ${line}`);
		jolts.push(jolt);
	})

	const totalJoltage = sumNumericArray(jolts)

	console.log(`Total joltage: ${totalJoltage}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-03/${source}.txt`;
	return getContents(inputPath);
}

function buildValuesIndexesMap(line: string): ValuesToIndexes {
		const valuesToIndexes: ValuesToIndexes = {};

		const lineLength = line.length;
		for (let i = 0; i < lineLength; i++) {
			const digit = line[i];
			if (!valuesToIndexes[digit]) {
				valuesToIndexes[digit] = [];
			}
			valuesToIndexes[digit].push(i);
		}

		return valuesToIndexes;
}

solveChallengeTwo();