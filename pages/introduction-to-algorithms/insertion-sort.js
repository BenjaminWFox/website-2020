const array1 = [5, 2, 4, 6, 1, 3]
const array2 = [31, 41, 59, 26, 41, 58]


/**
 * Insertion-Sort, increasing order
 */
const isIncreasing = (arr) => {
  for (let j = 1; j < arr.length; j += 1) {
    const key = arr[j]
    let i = j - 1

    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i]
      i -= 1
    }
    arr[i + 1] = key
  }

  console.log(arr)
}

isIncreasing(array1)
isIncreasing(array2)

/** Exercise 2.1-2
 *
 * Rewrite insertion-sort to nonincreasing instead of nondecreasing
 */
const isDecreasing = (arr) => {
  for (let j = 1; j < arr.length; j += 1) {
    const key = arr[j]
    let i = j - 1

    while (i >= 0 && arr[i] < key) {
      arr[i + 1] = arr[i]
      i -= 1
    }
    arr[i + 1] = key
  }

  console.log(arr)
}

isDecreasing(array1)
isDecreasing(array2)

/**
 * Exercise 2.1-3
 *
 * Pseudocode for linear search. Loop Invariant:
 *
 * 1. At the beginning of each iteration, the subarray of a[] contains
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


export default function InsertionSort() {
  return null
}
