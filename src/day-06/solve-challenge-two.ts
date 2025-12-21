import { getContents, multiplyNumericArray, sumNumericArray } from "../utils";

type Problem = {
	operation: string;
	operands: number[];
}

// node dist/day-06/solve-challenge-two.js <sample|input>
function solveChallenge() {
	const input = getInput(process.argv[2]);
	const problems = parseInput(input);

	const results: number[] = [];
	
	problems.forEach((problem) => {
		const { operands, operation  } = problem;
		results.push(mathElements(operands, operation));
	})

	const solution = sumNumericArray(results);

	console.log(`Solution is: ${solution}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-06/${source}.txt`;
	return getContents(inputPath);
}

function parseInput(input: string[]): Problem[] {
	const numberLineInput = input.splice(0,input.length - 1);
	const operationLine = input.pop();
	if (!operationLine) {
			throw new Error(`failed to find operations in remaining input: ${input}`);
	}

	const lineLength = operationLine.length;

	const problems: Problem[] = [];
	// Initialize first problem
	let problem: Problem = getNewProblem();

	for (let i = 0; i < lineLength; i++) {
		const operationChar = operationLine[i];
		if (operationChar !== ' ') {
			if (problem.operation) {
				// new problem -> push and reset problem
				problems.push(problem);
				problem = getNewProblem(operationLine[i]);
			} else {
				problem.operation = operationChar;
			}
		}

		let numberString = '';
		numberLineInput.forEach((numberLine) => {
			const char = numberLine[i] ?? ' ';
			if (char != ' ') {
				numberString += char;
			}
		});

		if (numberString !== '') {
			problem.operands.push(Number(numberString));
		}
	}

	// EOL, push last problem
	problems.push(problem);

	return problems;
}

function getNewProblem(operation = ''): Problem {
	return { operands: [], operation };
}

function mathElements(elements: number[], operation: string): number {
	return operation === '*' ? multiplyNumericArray(elements) : sumNumericArray(elements);
}

solveChallenge();