import { getContents } from "../utils/get-contents";

// node dist/day-five/solve-challenge.js sample
function solveChallenge() {
	const input = getInput(process.argv[2]);

	console.log('Grabbing ranges ...');
	const { freshIngredientRanges, blankLineIndex } = getFreshIngredientRanges(input);

	console.log('Grabbing ingredient ids ...');
	const ingredientIds: number[] = getIngredientIds(input, blankLineIndex);

	let freshIngredientIds: number[] = [];
	console.log('Iterating ingredient ids ...');
	ingredientIds.forEach((id) => {
		const keysToDelete: number[] = [];

		for (const [lowerBound, upperBound] of freshIngredientRanges) {
			if (id < lowerBound) {
				// it's not in the lowest available fresh range
				break;
			}

			if (id <= upperBound) {
				freshIngredientIds.push(id);
				break;
			}

			// id is > upperBound, we are done with this range
			keysToDelete.push(lowerBound);
			continue;
		}
		
		keysToDelete.forEach((key) => {
			freshIngredientRanges.delete(key);
		})
	});

	// 709 is too low
	const count = freshIngredientIds.length;
	console.log(`Answer is: ${count}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-five/${source}.txt`;
	return getContents(inputPath);
}

function getFreshIngredientRanges(lines: string[]) {
	let blankLineIndex = 0;
	const lengthOfInput = lines.length;

	const freshIngredientRangesUnsorted: Map<number, number> = new Map();
	const lowerBounds: number[] = [];

	for (let i = 0; i < lengthOfInput; i++) {
		const line = lines[i];
		if (line == '') {
			blankLineIndex = i;
			break;
		}

		const boundaries = line.split('-');
		const lowerBound = Number(boundaries[0]);
		const upperBound = Number(boundaries[1]);

		lowerBounds.push(lowerBound);
		freshIngredientRangesUnsorted.set(lowerBound, upperBound)
	}

	const sortedKeys = sortArray(lowerBounds);
	const freshIngredientRanges = new Map();

	for (const key of sortedKeys) {
		freshIngredientRanges.set(key, freshIngredientRangesUnsorted.get(key));
	}

	return {
		freshIngredientRanges,
		blankLineIndex,
	}
}

function getIngredientIds(input: string[], blankLineIndex: number): number[] {
	const lines = input.slice(blankLineIndex + 1);
	const ingredientIdsUnsorted: number[] = [];

	lines.forEach((line) => {
		ingredientIdsUnsorted.push(Number(line));
	})

	return sortArray(ingredientIdsUnsorted);
}

function sortArray(numberArray: number[]): number[] {
	return numberArray.sort((a, b) => a - b);
}


solveChallenge();