/* eslint-disable */



/* eslint-enable */

function merge(A, p, q, r) {
  console.log('Merging indexes', p, q, r, A)
  const n1 = q - p + 1
  const n2 = r - q
  const L = new Array(n1)
  const R = new Array(n2)

  let i = 0
  let j = 0

  for (i = 0; i < n1; i += 1) {
    L[i] = A[p + i]
  }
  for (j = 0; j < n2; j += 1) {
    R[j] = A[q + j + 1]
  }

  i = 0
  j = 0

  for (let k = p; k <= r; k += 1) {
    // Short-circuit `for` loop if either side is empty
    if (!R[j]) {
      while (i < L.length) {
        A[k] = L[i]
        i += 1
        k += 1
      }
      break
    }
    if (!L[j]) {
      while (j < R.length) {
        A[k] = R[j]
        j += 1
        k += 1
      }
      break
    }

    if (L[i] <= R[j]) {
      A[k] = L[i]
      i += 1
    }
    else {
      A[k] = R[j]
      j += 1
    }
  }

  return A
}

function mergeSort(A, p, r) {
  if (p < r) {
    const q = Math.floor((p + r) / 2)

    mergeSort(A, p, q)
    mergeSort(A, q + 1, r)
    merge(A, p, q, r)
  }

  // console.log('Done...', A)
}

const Arr = [2, 4, 5, 7, 1, 2, 3, 6]
const Arr2 = [2, 4, 5, 7, 3, 17, 12, 39, 16]

mergeSort(Arr, 0, 7)
console.log(Arr)

mergeSort(Arr2, 0, Arr2.length - 1)
console.log(Arr2)

// console.log(merge([2, 4, 5, 7, 1, 2, 3, 6], 0, 3, 7))
// console.log(merge([2, 4, 5, 7, 3, 17, 12, 39, 16], 0, 4, 8))

export default function Page() {
  return null
}
