const arr = [6, -2, 8, -12, 1, -17, -4, 9, 7, 2]

/**
 * Brute-force 'find max subarray' method
 * @param {array} a
 * @returns
 */
function bruteForceMaxSubArray(A) {
  /* eslint-disable */
  let subLeftIndex = 0
  let subRightIndex = 0
  let maxSum = 0

  /* eslint-enable */
  for (let i = 0; i < A.length - 1; i += 1) {
    let acc = A[i] // eslint-disable-line

    for (let j = i + 1; j < A.length; j += 1) {
      acc += A[j]

      if (acc > maxSum) {
        subLeftIndex = i
        subRightIndex = j
        maxSum = acc
      }
    }
  }

  return [subLeftIndex, subRightIndex, maxSum]
}

console.info(bruteForceMaxSubArray(arr))

/**
 * Recursive 'find max subarray' methods
 * @returns
 */
function checkMaxCrossoverArray(A, low, mid, high) {
  let leftMaxSum = -Infinity
  let sumL = 0
  let maxL = null

  for (let i = mid; i >= 0; i -= 1) {
    sumL += A[i]
    if (sumL > leftMaxSum) {
      leftMaxSum = sumL
      maxL = i
    }
  }

  let rightMaxSum = -Infinity
  let sumR = 0
  let maxR = null

  for (let i = mid + 1; i <= high; i += 1) {
    sumR += A[i]
    if (sumR > rightMaxSum) {
      rightMaxSum = sumR
      maxR = i
    }
  }

  return {
    low: maxL,
    high: maxR,
    sum: leftMaxSum + rightMaxSum
  }
}

function recurseMaxSubarray(A, low, high) {
  if (low === high) {
    return { low, high, sum: A[0] }
  }
  const mid = Math.floor((low + high) / 2)

  const { low: leftLow, high: leftHigh, sum: leftSum } = recurseMaxSubarray(A, low, mid)
  const { low: rightLow, high: rightHigh, sum: rightSum } = recurseMaxSubarray(A, mid + 1, high)
  const { low: crossLow, high: crossHigh, sum: crossSum } = checkMaxCrossoverArray(A, low, mid, high)

  if (leftSum >= rightSum && leftSum >= crossSum) {
    return { low: leftLow, highL: leftHigh, sum: leftSum }
  }

  if (rightSum >= leftSum && rightSum >= crossSum) {
    return { low: rightLow, high: rightHigh, sum: rightSum }
  }

  return { low: crossLow, high: crossHigh, sum: crossSum }
}

console.info(recurseMaxSubarray(arr, 0, arr.length - 1))

export default function Page() {
  return null
}
