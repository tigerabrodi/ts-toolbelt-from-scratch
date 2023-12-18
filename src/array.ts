type Append<T extends any[], U> = [...T, U]

type Prepend<T extends any[], U> = [U, ...T]

type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : T

type LengthArr<T extends any[]> = T['length']

type IncludesArr<T extends any[], U> = T extends [infer First, ...infer Rest]
  ? First extends U
    ? true
    : IncludesArr<Rest, U>
  : false

type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : []

// Example usages
type TestAppend = Append<[1, 2, 3], 4> // Result: [1, 2, 3, 4]
type TestPrepend = Prepend<[2, 3, 4], 1> // Result: [1, 2, 3, 4]
type TestConcat = Concat<[1, 2], [3, 4]> // Result: [1, 2, 3, 4]

type TestReverse = Reverse<[1, 2, 3]>
type TestLengthArr = LengthArr<[1, 2, 3, 4, 5]> // Result: 5

type TestIncludesArr = IncludesArr<[1, 2, 3, 4, 5], 3> // Result: true

type TestFlatten = Flatten<[[1, 2], [3, 4], 5]> // Result: [1, 2, 3, 4, 5]
