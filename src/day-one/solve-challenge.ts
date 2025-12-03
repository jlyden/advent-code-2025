import { getContents } from "../utils/get-contents";

function solveChallenge() {
	const inputOption = process.argv[2];
//	const forPartTwo = process.argv[3] === '2';
	const inputPath = `src/day-one/${inputOption}.txt`;
	const rotations = getContents(inputPath);

	let currentLocation = 50;
	let countOfZeros = 0;

	rotations.forEach((rotation) => {
		const direction = rotation.slice(0, 1);
		const rawDistance = rotation.slice(1);

		if (Number.isNaN(Number(rawDistance)) === true) {
			throw new Error(`Unexpected distance: ${rawDistance}`)
		}

//		const distanceHundreds = Number(rawDistance.slice(0, -2));
		const distanceTens = Number(rawDistance.slice(-2));

		switch (direction) {
			case 'L':
				currentLocation -= distanceTens;
				if (currentLocation < 0) {
					currentLocation += 100;
				}
				break;
			case 'R':
				currentLocation += distanceTens;
				if (currentLocation >= 100) {
					currentLocation -= 100;
				}
				break;
			default:
				throw new Error(`Unexpected direction: ${direction}`);
		}

		if (currentLocation === 0) {
			countOfZeros += 1;
		}
	})

	console.log(`Count of zeros: ${countOfZeros}`);
}

solveChallenge();