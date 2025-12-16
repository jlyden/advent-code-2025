export function multiplyNumericArray(numbers: number[]) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}
