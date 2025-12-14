import { getContents } from "../utils";

let lowerBound = 0;
let upperBound = 0;
const invalidIds: number[] = [];

// node dist/day-02/solve-challenge.js sample
function solveChallenge() {
	const ranges = getInput(process.argv[2]);

	ranges.forEach((range) => {
		const [lowerBoundStr, upperBoundStr] = getBoundaries(range);

		const lowerBoundStrLen = lowerBoundStr.length;
		const upperBoundStrLen = upperBoundStr.length;
		if (isOdd(lowerBoundStrLen) && isOdd(upperBoundStrLen)) {
			console.log(`ODD early exit`);
			return;
		}

		console.log('RANGE', range);
		lowerBound = Number(lowerBoundStr);
		upperBound = Number(upperBoundStr);

		const lowestHalf = getFirstHalf(lowerBoundStr);
		const highestHalf = getFirstHalf(upperBoundStr);

		let countInLoop = 0;
		let invalidIdCount = 0;
		for (let half = lowestHalf; half <= highestHalf; half++) {
			countInLoop++;
			const stringHalf = half.toString();
			const possibleInvalidId = Number(stringHalf + stringHalf);
			if (isInRange(possibleInvalidId)) {
				invalidIds.push(possibleInvalidId);
				invalidIdCount++;
			}
		}

		console.log(`  range loop count: ${countInLoop}`);
		console.log(`  invalidId count: ${invalidIdCount}`);
	});

	console.log('invalidIdsLength', invalidIds.length)

	const sumOfInvalidIds = invalidIds.reduce((acc, curr) => acc + curr, 0);

	// 5287329700 is too low
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
 * Return potential invalid id
 */
function getPotentialInvalidId(candidate: string): number {
	const firstHalf = getFirstHalf(candidate);
	return Number(firstHalf + firstHalf);
}

/**
 * Return first half of a numeric string, cast to number
 */
function getFirstHalf(candidate: string): number {
	let halfLength = candidate.length / 2;
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