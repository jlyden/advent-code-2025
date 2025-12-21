import { getContents } from "../utils";

// node dist/day-07/solve-challenge.js sample
function solveChallenge() {
  const input = getInput(process.argv[2]);

  console.log(`Answer is: UNKNOWN`);
}

function getInput(source: string): string[] {
  const inputPath = `src/day-07/${source}.txt`;
  return getContents(inputPath);
}

solveChallenge();