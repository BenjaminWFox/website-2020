/**
 * Exercise 2.1-3
 *
 * Pseudocode for linear search. Loop Invariant:
 *
 * 1. At the very beginning of the `for` loop (lines 57 - 63):
 *   - No matching index (v == a[i]) will have been found
 * 2. At the beginning of each subsequent iteration:
 *   - No matching index (v == a[i]) will have been found
 * 3. At the termination of the loop:
 *   - The method will return i (where v == a[i]) OR `null` if i == a.length
 */

const findVInA = (v, a) => {
  for (let i = 0; i < a.length; i += 1) {
    const key = a[i]

    if (key === v) {
      return i
    }
  }

  return null
}

const searchArr = [1, 4, 7, 23, 71, 923, 12, 52]

console.log(findVInA(923, searchArr))
console.log(findVInA(8, searchArr))


export default function Page() {
  return null
}
