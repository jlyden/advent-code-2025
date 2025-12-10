import { getContents } from "../utils";

// node dist/day-02/solve-challenge.js sample
function solveChallenge() {
	const ranges = getInput(process.argv[2]);

	const invalidIds: number[] = [];

	ranges.forEach((range) => {
		console.log(`range: ${range}`);

		const [lowerBound, upperBound] = getBoundaries(range);

		const lowerBoundHasEvenLength = isEven(lowerBound.length);
		const upperBoundHasEvenLength = isEven(upperBound.length);

		if (!lowerBoundHasEvenLength && !upperBoundHasEvenLength) {
			return;
		}
		
		const lowerBoundNum = Number(lowerBound);
		const upperBoundNum = Number(upperBound);

		if (lowerBoundHasEvenLength && !upperBoundHasEvenLength) {
			const potentialInvalidId = getPotentialInvalidId(lowerBound);
			if (isInRange(lowerBoundNum, upperBoundNum, potentialInvalidId)) {
				invalidIds.push(potentialInvalidId);
			}
			return;
		}

		if (upperBoundHasEvenLength && !lowerBoundHasEvenLength) {
			const potentialInvalidId = getPotentialInvalidId(upperBound);
			if (isInRange(lowerBoundNum, upperBoundNum, potentialInvalidId)) {
				invalidIds.push(potentialInvalidId);
			}
			return;
		}

		const firstHalfOfLowerBound = getFirstHalfOfBoundary(lowerBound);
		const firstHalfOfUpperBound = getFirstHalfOfBoundary(upperBound);

		if (firstHalfOfLowerBound === firstHalfOfUpperBound) {
			const potentialInvalidId = Number(firstHalfOfLowerBound + firstHalfOfLowerBound);
			if (isInRange(lowerBoundNum, upperBoundNum, potentialInvalidId)) {
				invalidIds.push(potentialInvalidId);
			}
			return;
		}

		// when both are even and there's a big diff in first halves, room for many more invalid ids
		// TODO: figure it out

	});

	console.log(invalidIds);

	const sumOfInvalidIds = invalidIds.reduce((acc, curr) => acc + curr, 0);

	// 1976006979 is too low
	console.log(`Solution is: ${sumOfInvalidIds}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-02/${source}.txt`;
	return getContents(inputPath, null, ',');
}

function getBoundaries(range: string): string[] {
	const boundaries = range.split('-');

	if (boundaries.length !== 2) {
		throw new Error(`Unexpected range: ${range}`);
	}

	return [boundaries[0], boundaries[1]];
}

function isEven(size: number): boolean {
	return size % 2 === 0;
}

function getPotentialInvalidId(boundary: string): number {
	const firstHalfOfBoundary = getFirstHalfOfBoundary(boundary);
	return Number(firstHalfOfBoundary + firstHalfOfBoundary);
}

function getFirstHalfOfBoundary(boundary: string): string {
	const halfLength = boundary.length / 2;
	return boundary.slice(0, halfLength);
}

function isInRange(lowerBound: number, upperBound: number, target: number): boolean {
	return (lowerBound <= target) && (target <= upperBound);
}

solveChallenge();