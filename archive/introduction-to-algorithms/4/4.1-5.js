const arr1 = [1, 1, -3, 2, 4, -3, -3]
const arr2 = [100, -10, 1, 1, 50, -5]
const arr3 = [1, -1, -1, 1, 1, 1, -1, -1, 1]
const arr = arr1

function maxSumLinear(A) {
  const n = A.length
  let maxSum = -Infinity
  let sum = -Infinity
  let currentHigh = 0
  let currentLow = 0
  let low = 0
  let high = 0

  for (let j = 0; j < n; j += 1) {
    currentHigh = j

    if (sum > 0) {
      sum += A[j]
    }
    else {
      currentLow = j
      sum = A[j]
    }

    if (sum > maxSum) {
      maxSum = sum
      low = currentLow
      high = currentHigh
    }

  }

  return { low, high, maxSum }
}

console.log(maxSumLinear(arr2))

export default function Page() {
  return null
}
