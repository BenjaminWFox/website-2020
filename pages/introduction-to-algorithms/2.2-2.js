/* eslint-disable */

/*
Invariant:
  Starting the loop, all elements A[0...i-1] will be sorted,
  all elements A[i...n] will be greater than elements A[<i]
Maintenance:
  Starting the loop, all elements A[0...i-1] will be sorted,
  all elements A[i...n] will be greater than elements A[<i]
Termination:

*/

function selectionSort(A) {
  // Run loop for each index, A[i]
  for (let i = 0; i < A.length - 2; i += 1) {
    let smallestIndex = i

    for (let j = i + 1; j < A.length - 1; j += 1) {
      if (A[j] < A[smallestIndex]) {
        smallestIndex = j
      }
    }

    key = A[smallestIndex]
    A[smallestIndex] = A[i]
    A[i] = key
  }
}

/* eslint-enable */


export default function Page() {
  return null
}
