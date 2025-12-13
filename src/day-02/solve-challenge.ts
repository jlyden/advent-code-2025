import { diff } from "util";
import { getContents } from "../utils";

let lowerBound = 0;
let upperBound = 0;
let suppressLogs = true;
const invalidIds: number[] = [];

// node dist/day-02/solve-challenge.js sample
function solveChallenge() {
	const ranges = getInput(process.argv[2]);

	ranges.forEach((range) => {
		const [lowerBoundStr, upperBoundStr] = getBoundaries(range);

		const lowerBoundStrLen = lowerBoundStr.length;
		const upperBoundStrLen = upperBoundStr.length;
		if (isOdd(lowerBoundStrLen) && isOdd(upperBoundStrLen)) {
			console.log(`  both odd early exit`);
			return;
		}

		console.log(ranges);
		lowerBound = Number(lowerBoundStr);
		upperBound = Number(upperBoundStr);

		// Handle lower bound
		const lowestPotentialLowerBoundInvalidId = getPotentialInvalidId(lowerBoundStr);
		console.log(`  potentialInvalidId: ${lowestPotentialLowerBoundInvalidId}`);
		if (isInRange(lowestPotentialLowerBoundInvalidId)) {
				console.log(`  hit on: ${lowestPotentialLowerBoundInvalidId}`);
			invalidIds.push(lowestPotentialLowerBoundInvalidId);
		}

		handlePotentialInvalidId(upperBoundStr);

		// when both are even and there's a big diff in first halves, room for many more invalid ids
		// TODO: figure it out
		// look at (4952, 6512)
		// not 4949, but 5050, 5151, 5252, 5353, 5454, ... 6464
	});

	const uniqueInvalidIds = [...new Set(invalidIds)];

	console.log(uniqueInvalidIds);

	const sumOfInvalidIds = uniqueInvalidIds.reduce((acc, curr) => acc + curr, 0);

	// 1976006979 is too low
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
 * Run through check for potential invalid id
 */
function handlePotentialInvalidId(value: string): void {
	const potentialInvalidId = getPotentialInvalidId(value);
	if (!suppressLogs) {
		console.log(`  potentialInvalidId: ${potentialInvalidId}`);
	}
	if (isInRange(potentialInvalidId)) {
		if (!suppressLogs) {
			console.log(`  hit on: ${potentialInvalidId}`);
		}
		invalidIds.push(potentialInvalidId);
	}
}

/**
 * Return potential invalid id from boundary
 */
function getPotentialInvalidId(boundary: string): number {
	const firstHalfOfBoundary = getFirstHalfOfBoundary(boundary);
	return Number(firstHalfOfBoundary + firstHalfOfBoundary);
}

/**
 * Return first half of a numeric string with even length
 */
function getFirstHalfOfBoundary(boundary: string): string {
	let halfLength = boundary.length / 2;
	return boundary.slice(0, halfLength);
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