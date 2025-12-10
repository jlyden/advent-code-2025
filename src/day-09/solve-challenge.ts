import { getContents, sortArray } from "../utils";

// node dist/day-09/solve-challenge.js sample
function solveChallenge() {
	const coords = getInput(process.argv[2]);

	// find the lowest of each coordinate
	// if there are multiple, pick the largest of the other coord 
	let lowestXValue = 100000;
	let lowestYValue = 100000;

	const lowXCoords = new Map<number, number[]>();
	const lowYCoords = new Map<number, number[]>();

	coords.forEach((coordinates) => {
		const [x, y] = coordinates.split(',').map(Number);

		if (x <= lowestXValue) {
			lowestXValue = x;
			const xCoordsYs = lowXCoords.get(x) ?? [];
			xCoordsYs.push(y);
			lowXCoords.set(x, xCoordsYs);
		}

		if (y <= lowestYValue) {
			lowestYValue = y;
			const yCoordsXs = lowYCoords.get(y) ?? [];
			yCoordsXs.push(x);
			lowYCoords.set(y, yCoordsXs);
		}
	});

	const lowXCoordsYs = lowXCoords.get(lowestXValue);
	const sortedLowXCoordsYs = sortArray(lowXCoordsYs!);
	const lowXHighY = sortedLowXCoordsYs[sortedLowXCoordsYs.length-1];
	console.log('lowest X, highest Y', lowestXValue, lowXHighY)

	const lowYCoordsXs = lowYCoords.get(lowestYValue);
	const sortedLowYCoordsXs = sortArray(lowYCoordsXs!);
	const lowYHighX = sortedLowYCoordsXs[sortedLowYCoordsXs.length-1];
	console.log('highest X, lowest Y', lowYHighX, lowestYValue)

	const solution = (lowYHighX - lowestXValue + 1) * (lowXHighY - lowestYValue + 1);

	// 2573732103 is too low
	console.log(`Solution is: ${solution}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-09/${source}.txt`;
	return getContents(inputPath);
}

solveChallenge();