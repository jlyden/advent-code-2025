import path from 'path';
import fs from 'fs';
    
function getContents(filenameWithPath: string, returnLimit: number | null = null, splitter = '\n') {
  const source = path.resolve(filenameWithPath);
  const contents = fs.readFileSync(source, 'utf8').toString().split(splitter);
  return returnLimit ? contents.splice(0, returnLimit) : contents;
}

function sumANumericArray(numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

export { getContents, sumANumericArray };