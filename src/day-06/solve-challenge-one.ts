import { getContents, multiplyNumericArray, sumNumericArray } from "../utils";

// node dist/day-06/solve-challenge-one.js <sample|input>
function solveChallenge() {
	const input = getInput(process.argv[2]);
	const [numberLines, operations] = parseInput(input);

	const results: number[] = []

	const problemCount = operations.length;
	const lineCount = numberLines.length;

	for (let problem = 0; problem < problemCount; problem++) {
		const elements: number[] = []

		for (let line = 0; line < lineCount; line++) {
			const element = Number(numberLines[line][problem]);
			elements.push(element)
		}

		const result = mathElements(elements, operations[problem]);
		results.push(result);
	}

	const solution = sumNumericArray(results);

	console.log(`Solution is: ${solution}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-06/${source}.txt`;
	return getContents(inputPath);
}

function parseInput(input: string[]): [RegExpMatchArray[], RegExpMatchArray] {
	const numberPattern = /\d+/g;
	const numberLineInput = input.splice(0,input.length - 1);
	const numberLines: RegExpMatchArray[] = [];
	numberLineInput.forEach((line) => {
		const matches = line.match(numberPattern);
		if (!matches) {
			throw new Error(`regex failed on line: ${line}`);
		}
		numberLines.push(matches);
	});

	const operationPattern = /\+|\*/g;
	const operationLine = input.pop();
	if (!operationLine) {
			throw new Error(`failed to find operations in remaining input: ${input}`);
	}

	const operations = operationLine.match(operationPattern);
	if (!operations) {
		throw new Error(`regex failed on operations line: ${operationLine}`);
	}

	return [numberLines, operations];
}

function mathElements(elements: number[], operation: string): number {
	return operation === '*' ? multiplyNumericArray(elements) : sumNumericArray(elements);
}

solveChallenge();