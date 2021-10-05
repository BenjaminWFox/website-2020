const array1 = [5, 2, 4, 6, 1, 3]
const array2 = [31, 41, 59, 26, 41, 58]

/**
 * Insertion-Sort, increasing order
 */
const fn = `const isIncreasing = (arr) => {
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
isIncreasing(array2)`

eval(fn)

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
}

isDecreasing(array1)
isDecreasing(array2)

export default function Page() {
  return (
    <div className="markdown-body">
      <pre>
        <code className="language-javascript">
          {fn}
        </code>
      </pre>
    </div>
  )
}
