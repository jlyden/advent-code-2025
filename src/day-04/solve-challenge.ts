import { getContents } from "../utils";

const ROLL = '@';

let grid: string[][];
let xLength: number;
let yLength: number;

// node dist/day-04/solve-challenge.js sample
function solveChallenge() {
	const input = getInput(process.argv[2]);
	setupGrid(input);

	let canBeAccessed = 0;
	for (let x = 0; x < xLength; x++) {
		for (let y = 0; y < yLength; y++) {
			if (!spotIsARoll(x, y)) {
				continue;
			}
			
			if (canAccess(x, y)) {
				canBeAccessed += 1;
			}
		}
	}

	console.log(`Solution is: ${canBeAccessed}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-04/${source}.txt`;
	return getContents(inputPath);
}

function setupGrid(lines: string[]): void {
	const gridInProgress: string[][] = [];

	lines.forEach((line) => {
		const splitLine = line.split('');
		gridInProgress.push(splitLine);
	});

	grid = gridInProgress;
	xLength = grid[0].length;
	yLength = grid.length;
}

function spotIsARoll(x: number, y: number): boolean {
	return grid[y][x] === ROLL;
}

function canAccess(spotX: number, spotY: number) {
	let rolls = -1; // Leave out the spot itself!

	for (let x = spotX - 1; x <= spotX + 1; x++) {
		for (let y = spotY - 1; y <= spotY + 1; y++) {
			if (grid[y] && grid[y][x] && spotIsARoll(x, y)) {
				rolls += 1;
			}
		}
	}

	return rolls < 4;
}

solveChallenge();