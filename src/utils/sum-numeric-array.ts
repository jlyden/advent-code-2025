import path from 'path';
import fs from 'fs';
    
export function sumNumericArray(numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
