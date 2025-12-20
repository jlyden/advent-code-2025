import { getContents } from "../utils";

const ROLL = '@';
const REMOVED = 'x';

let grid: string[][];
let xLength: number;
let yLength: number;

// node dist/day-04/solve-challenge.js <sample|input> <2>
function solveChallenge() {
	const input = getInput(process.argv[2]);
	const partTwo = process.argv[3] === '2';
	setupGrid(input);

	let canBeRemoved = 0;
	let justRemoved = 0;
	do {
		justRemoved = runTheGrid(partTwo);
		canBeRemoved += justRemoved;
	} while (justRemoved > 0);

	console.log(`Solution is: ${canBeRemoved}`);
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

function runTheGrid(isPartTwo: boolean) {
	let canBeRemoved = 0;
	for (let x = 0; x < xLength; x++) {
		for (let y = 0; y < yLength; y++) {
			if (!spotIsARoll(x, y)) {
				continue;
			}
			
			if (canRemove(x, y)) {
				canBeRemoved += 1;
				if (isPartTwo) {
					removeRoll(x,y);
				}
			}
		}
	}
	return canBeRemoved;
}

function spotIsARoll(x: number, y: number): boolean {
	return grid[y][x] === ROLL;
}

function removeRoll(x: number, y: number): void {
	grid[y][x] = REMOVED;
}

function canRemove(spotX: number, spotY: number) {
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