import { getContents } from "../utils";

function solveChallenge() {
	const rotations = getInput(process.argv[2]);
	const forPartTwo = process.argv[3] === '2';

	let currentLocation = 50;
	let previousLocation = 50;
	let countOfZeros = 0;

	rotations.forEach((rotation) => {
		const direction = rotation.slice(0, 1);

		const [ spinDistance, extraRotations ] = parseDistance(rotation);
		if (forPartTwo && extraRotations > 0) {
			countOfZeros += extraRotations;
		}

		switch (direction) {
			case 'L':
				currentLocation -= spinDistance;
				if (currentLocation < 0) {
					currentLocation += 100;
					if (forPartTwo && previousLocation > 0) {
						countOfZeros++;
					}
				}
				break;
			case 'R':
				currentLocation += spinDistance;
				if (currentLocation > 100) {
					currentLocation -= 100;
					if (forPartTwo && previousLocation < 100) {
						countOfZeros++;
					}
				}
				break;
			default:
				throw new Error(`Unexpected direction: ${direction}`);
		}

		if (currentLocation === 0) {
			countOfZeros ++;
		}

		if (currentLocation === 100) {
			currentLocation -= 100;
			countOfZeros ++;
		}

		previousLocation = currentLocation;
	})

	console.log(`Count of zeros at end: ${countOfZeros}`);
}

function getInput(source: string): string[] {
	const inputPath = `src/day-01/${source}.txt`;
	return getContents(inputPath);
}

function parseDistance(rotation: string): number[] {
			const rawDistance = rotation.slice(1);

		if (Number.isNaN(Number(rawDistance)) === true) {
			throw new Error(`Unexpected distance: ${rawDistance}`)
		}

		const extraRotations = Number(rawDistance.slice(0, -2));
		const spinDistance = Number(rawDistance.slice(-2));

		return [spinDistance, extraRotations];
}

solveChallenge();