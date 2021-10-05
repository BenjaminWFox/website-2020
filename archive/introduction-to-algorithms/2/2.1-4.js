/**
 * 2.1-4 - Binary Addition
 *
 * Input:
 *    Two n-bit binary integers stored in two n-element arrays, A & B
 *    A[a0...an] & B[b0...bn]
 * Output:
 *    The sum of binary integers A + B stored in an array C (length n+1)
 * Assumptions:
 *    The use consistent use of `n` shows that both A and B will consiste
 *    of the same number of bits, and same length array.
 */

/* eslint-disable */

/* Original PseudoCode:
function addBits(a, b, carry) {
  newBit = (a + b + c) % 2
  carry = (a + b + c) / 2

  return newBit, carry
}

function addBinaries(A, B) {
  carry = 0
  C = new Array[A.length + 1]

  for (let i = A.length; i > 0; i -= 1) {
    newBit, carry = addBits(A[i], B[i], carry)
    C[i] = newBit
  }

  C[0] = carry

  return C
}
*/

/* eslint-enable */

// Functional JavaScript
const addBinary = (a, b, c) => {
  if (a > 1 || a < 0 || b > 1 || b < 0) {
    throw new Error('Not a 1 or a 0')
  }

  const sum = (a ^ b) ^ c
  let carry = 0

  if (
    (a === 1 && b === 1) ||
    ((a === 1 || b === 1) && c === 1)) {
    carry = 1
  }

  return [sum, carry]
}

/**
 * Assumption
 *
 * Initialization:
 *    At the start of the loop (lines 68-79) the array C[i+1...A.length]
 *    will consist of the previously added elements of arrays A/B[i...A.length - 1]
 * Maintenance:
 *    At the start of the loop (lines 68-79) the array C[i+1...A.length]
 *    will consist of the previously added elements of arrays A/B[i...A.length - 1]
 * Termination:
 *    At the end of the loop, the final bit will be added to complete C[0...A.length],
 *    which will be the final amount of the `carry`
 */
const addBinaries = (A, B) => {
  const C = new Array(A.length + 1)
  let carry = 0

  for (let i = A.length - 1; i >= 0; i -= 1) {
    const [sum, c] = addBinary(A[i], B[i], carry)

    carry = c

    C[i + 1] = sum
  }

  C[0] = carry

  console.log(C)
}

// const A = [0, 1, 1, 0]
// const B = [0, 1, 1, 1]

const A = [0, 1, 0, 1, 1, 1, 0, 1]
const B = [0, 1, 1, 0, 0, 1, 0, 1]

addBinaries(A, B)

export default function Page() {
  return null
}
