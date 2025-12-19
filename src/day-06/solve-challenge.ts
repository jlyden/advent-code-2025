import { getContents, multiplyNumericArray, sumNumericArray } from "../utils";

// node dist/day-06/solve-challenge.js <sample|input> <2>
function solveChallenge() {
	const input = getInput(process.argv[2]);
	const [numberLines, operations] = parseInput(input);

	let solution = 0;
	if (process.argv[3] === '2') {
		solution = runPartTwo(numberLines, operations);
	} else {
		solution = runPartOne(numberLines, operations);
	}

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

function runPartOne(numberLines: RegExpMatchArray[], operations: RegExpMatchArray): number {
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

	return sumNumericArray(results);
}

// Incomplete, b/c the whitespace matters
function runPartTwo(numberLines: RegExpMatchArray[], operations: RegExpMatchArray): number {
	const results: number[] = []

	const problemCount = operations.length;
	const lineCount = numberLines.length;

	for (let problem = 0; problem < problemCount; problem++) {
		const values: string[][] = []

		let longestValue = 0;
		for (let line = 0; line < lineCount; line++) {
			const value = numberLines[line][problem];
			values.push(value.split(''));
			if (value.length > longestValue) {
				longestValue = value.length;
			}
		}
		
		const newElements: number[] = [];
		for (let i = 0; i < lineCount; i++) {
			let element: string[] = [];
			for (let j = 0; j < longestValue; j++) {
				const char = values[j].pop();
				if (char) {
					element.push(char);
				}
			}
			newElements.push(Number(element.join('')));
		}

		console.log('newElements: ', newElements);
		const result = mathElements(newElements, operations[problem]);
		results.push(result);
	}

	return sumNumericArray(results);
}

function mathElements(elements: number[], operation: string): number {
	return operation === '*' ? multiplyNumericArray(elements) : sumNumericArray(elements);
}

solveChallenge();