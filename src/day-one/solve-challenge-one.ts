import { getContents } from "../utils/get-contents";

function solveChallengeOne(): void {
	const inputOption = process.argv[2];
	const inputPath = `src/day-one/${inputOption}.txt`;
	const rotations = getContents(inputPath);

	let currentLocation = 50;
	let countOfZeros = 0;

	rotations.forEach((rotation) => {
		const direction = rotation[0];
		const distance = Number(rotation.substring(1));

		if (Number.isNaN(distance) === true) {
			throw new Error(`Unexpected distance: ${distance}`)
		}

		switch (direction) {
			case 'L':
				currentLocation -= distance;
				break;
			case 'R':
				currentLocation += distance;
				break;
			default:
				throw new Error(`Unexpected direction: ${direction}`);
		}

		currentLocation = currentLocation % 100;

		if (currentLocation === 0) {
			countOfZeros += 1;
		}
	})

	console.log(`Count of zeros: ${countOfZeros}`);
}

solveChallengeOne();