// Utility Type 1: At
// Retrieves the type at a specified index in a tuple or array.
type At<Type extends Array<any>, Index extends number> = Type[Index]
type ExampleAt = At<[string, number, boolean], 1> // Expected to be number

// Utility Type 2: Equals
// Compares two types for equality.
// Different from `Extends` because it checks for exact equality and not one type being assignable to another.
type Equals<A, B> = A extends B ? (B extends A ? true : false) : false
type ExampleEquals = Equals<{ a: number; b: string }, { a: number; b: string }> // Expected to be true

// Utility Type 3: Contains
// Checks if a type is contained within another type (like array.includes).
// `T[number]` gets the union type of an array or tuple.
type Contains<T extends Array<any>, U> = U extends T[number] ? true : false
type ExampleContains = Contains<[string, number, boolean], boolean> // Expected to be true

// Utility Type 4: Extends
// Checks if one type extends another.
// Different from `Equals` because it checks for one type being assignable to another, not exact equality
type Extends<A, B> = A extends B ? true : false
type ExampleExtends = Extends<'a' | 'b', string> // Expected to be true

// Utility Type 5: Is
// Determines if a type is exactly another type (not just assignable).

// In TypeScript, the expression T extends U is a conditional type that checks if type T can be assigned to type U. However, this has a distributive property when T is a union type. For example, string | number extends string would be true because string is part of the union and is assignable to string.

// By wrapping types in tuples, we prevent the distributive property from applying. This means that [T] extends [U] is not checking if each member of a union T can be assigned to U, but rather if the whole type T (as a single entity within a tuple) can be assigned to the whole type U (also as a single entity within a tuple).

// The double check with [U] extends [T] ensures that not only can T be assigned to U, but also U can be assigned to T. This reciprocal relationship is necessary to establish that T and U are exactly the same type, not just that they are compatible or one is a subset of the other.
type Is<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false
type ExampleIs = Is<string | number, string> // Expected to be false

// Usage examples (should fail until types are correctly implemented)
const exampleAt: ExampleAt = 42 // Should be a number

const exampleEquals: ExampleEquals = true // Should be true

const exampleContains: ExampleContains = true // Should be true

const exampleExtends: ExampleExtends = true // Should be true

const exampleIs: ExampleIs = false // Should be false
