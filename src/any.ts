// Utility Type 1: At
// Retrieves the type at a specified index in a tuple or array.
type At<Type extends Array<any>, Index extends number> = Type[Index]
type ExampleAt = At<[string, number, boolean], 1> // Expected to be number

// Utility Type 2: Equals
// Compares two types for equality.
// type Equals<A, B> = // TODO: Implement this type
// type ExampleEquals = Equals<{ a: number; b: string }, { a: number; b: string }> // Expected to be true

// // Utility Type 3: Contains
// // Checks if a type is contained within another type (like array.includes).
// type Contains<T, U> = // TODO: Implement this type
// type ExampleContains = Contains<[string, number, boolean], boolean> // Expected to be true

// // Utility Type 4: Extends
// // Checks if one type extends another.
// type Extends<A, B> = // TODO: Implement this type
// type ExampleExtends = Extends<'a' | 'b', string> // Expected to be true

// // Utility Type 5: Is
// // Determines if a type is exactly another type (not just assignable).
// type Is<T, U> = // TODO: Implement this type
// type ExampleIs = Is<string | number, string> // Expected to be false

// Usage examples (should fail until types are correctly implemented)
const exampleAt: ExampleAt = 42 // Should be a number

// const exampleEquals: ExampleEquals = true; // Should be true
// const exampleContains: ExampleContains = true; // Should be true
// const exampleExtends: ExampleExtends = true; // Should be true
// const exampleIs: ExampleIs = false; // Should be false
