import { getContents, sumNumericArray } from "../utils";

let lowerBound = 0;
let upperBound = 0;
const invalidIds: number[] = [];

// node dist/day-02/solve-challenge.js <sample|input>
function solveChallenge() {
	const ranges = getInput(process.argv[2]);

	ranges.forEach((range) => {
		const [lowerBoundStr, upperBoundStr] = getBoundaries(range);

		const lowerBoundStrLen = lowerBoundStr.length;
		const upperBoundStrLen = upperBoundStr.length;
		if (isOdd(lowerBoundStrLen) && isOdd(upperBoundStrLen)) {
			return;
		}

		lowerBound = Number(lowerBoundStr);
		upperBound = Number(upperBoundStr);

		const [lowestHalf, highestHalf] = getFirstHalves(lowerBoundStr, upperBoundStr);

		for (let half = lowestHalf; half <= highestHalf; half++) {
			const stringHalf = half.toString();
			const possibleInvalidId = Number(stringHalf + stringHalf);
			if (isInRange(possibleInvalidId)) {
				invalidIds.push(possibleInvalidId);
			}
		}
	});

	const sumOfInvalidIds = sumNumericArray(invalidIds);

	console.log(`Solution is: ${sumOfInvalidIds}`);
}

/**
 * Get input
 */
function getInput(source: string): string[] {
	const inputPath = `src/day-02/${source}.txt`;
	return getContents(inputPath, null, ',');
}

/**
 * Get boundaries from range
 */
function getBoundaries(range: string): string[] {
	const boundaries = range.split('-');

	if (boundaries.length !== 2) {
		throw new Error(`Unexpected range: ${range}`);
	}

	return [boundaries[0], boundaries[1]];
}

/**
 * The first half of a numeric string, adjusted for position and length
 */
function getFirstHalves(lowerBoundStr: string, upperBoundStr: string): number[] {
	const lowerAdjustment = isOdd(lowerBoundStr.length) ? -1 : 0;
	const lowestHalf = getFirstHalf(lowerBoundStr, lowerAdjustment);
	const upperAdjustment = isOdd(upperBoundStr.length) ? +1 : 0;
	const highestHalf = getFirstHalf(upperBoundStr, upperAdjustment);
	return [lowestHalf, highestHalf];
}

/**
 * Return first half of a numeric string, cast to number
 */
function getFirstHalf(candidate: string, adjustment: number): number {
	let halfLength = (candidate.length + adjustment) / 2;
	return Number(candidate.slice(0, halfLength));
}

/**
 * Return true if number is odd
 */
function isOdd(size: number): boolean {
	return size % 2 !== 0;
}

/**
 * Return true if target is between bounds
 */
function isInRange(target: number): boolean {
	return (lowerBound <= target) && (target <= upperBound);
}

solveChallenge();