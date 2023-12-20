# TS Toolbelt from Scratch

Just having fun with TypeScript types.

Taking some notes on my learnings too.

## Distributive Property

The distributive property in TypeScript refers to how conditional types are applied to union types. When you have a conditional type and the type you are checking is a union, TypeScript will distribute the conditional type over each member of the union. This is a unique behavior in TypeScript's type system.

Given a conditional type of the form `T extends U ? X : Y` and a union type `A | B | C` for `T`, TypeScript will distribute the conditional type over each member of the union. Essentially, it checks the condition for each member of the union independently.

This for example:

```ts
type T = A | B | C
type Result = T extends U ? X : Y
```

Would result in this:

```ts
(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
```

If one of them is true, the entire expression results in true.

## Prevent Distributive Property

To prevent the Distributive Property behavior, you can wrap the type in a tuple:

```ts
type IsStringNonDistributive<T> = [T] extends [string] ? true : false
type ResultNonDistributive = IsStringNonDistributive<string | number>
```

## `T[number]` conditional check

Here `T[number]` is interesting. In a conditional type, this means creating a union type of all elements in the array for `T`.

For example, if `T` is `[string, number, boolean]`, then `T[number]` is `string | number | boolean`.

```ts
type Contains<T extends Array<any>, U> = U extends T[number] ? true : false
type ExampleContains = Contains<[string, number, boolean], boolean>
```

The above example becomes `U extends string | number | boolean ? true : false`. If `U` is assignable to the union type, then we get true.

## Zip type

This type is an interesting one. I was a bit quick with my thinking at first. The first try I failed.

```ts
type ExampleZip = Zip<[1, 2, 3], ['a', 'b', 'c']> // Expected to be [[1, 'a'], [2, 'b'], [3, 'c']]
```

Here is how I implemented it at first:

```ts
type Zip<T extends any[], U extends any[]> = T extends [infer A, ...infer RestT]
  ? U extends [infer B, ...infer RestU]
    ? [[A, B], Zip<RestT, RestU>]
    : never
  : never
```

This results in `[[1, "a"], [[2, "b"], [[3, "c"], never]]]`.

Obviously, we're using the `never` type which we shouldn't. Because it'd result in `never` when Zipping two empty arrays.

As for the nested arrays inside the type, it's because we're not spreading the result of the recursive call to `Zip` type.

Here is the correct implementation:

```ts
type Zip<T extends any[], U extends any[]> = T extends [infer A, ...infer RestT]
  ? U extends [infer B, ...infer RestU]
    ? [[A, B], ...Zip<RestT, RestU>]
    : []
  : []
```

## Paths

This one took me several hours to solve lol :joy:

```ts
type Paths<T extends Record<string, any>> = keyof T extends never
  ? []
  : T extends object
  ? { [K in keyof T]: [K, ...Paths<T[K]>] }[keyof T]
  : []

type ExamplePaths = Paths<{ a: { b: { c: number }; d: string }; e: boolean }> // ['a', 'b', 'c'] | ['a', 'd'] | ['e']
```

Let's break it down in small steps.

The first check `keyof T extends never ? [] ...` is to check if `T` is an empty object. If it is, then we return an empty array.

The second check `T extends object ? ...` is to check if `T` is an object. If it is, then we return a mapped type that we turn into a union type with `[keyof T]` (indexed access type turn the object into a union type of all the keys' values).

Example of indexed access type on a mapped type:

```ts
type Example = { a: string; b: number }
type ExampleMapped = { [K in keyof Example]: Example[K] } // results in { a: string; b: number }
type ExampleIndexedAccess = ExampleMapped[keyof Example] // results in string | number
```

`ExampleMapped[keyof Example]` is the same as `{ [K in keyof Example]: Example[K] }[keyof Example]`.

Let's take a look at the mapped type:

```ts
{ [K in keyof T]: [K, ...Paths<T[K]>] }[keyof T]
```

Initial object:

```ts
{
  a: {
    b: {
      c: number
    }
    d: string
  }
  e: boolean
}
```

First iteration:

```ts
{
  a: ['a', ...Paths<{ b: { c: number }; d: string }>]
}
```

Second iteration:

```ts
{
  a: [ 'a', ...[ 'b', ...Paths<{ c: number }> ] ], // Array next to 'a' will be spreaded
  e: [ 'e', ...Paths<boolean> ] // boolean is not an object, so it returns []
}
```

`...Paths<boolean>` is the same as `...[]` which is the same as `[]`.

Third iteration:

```ts
{
  a: [ 'a', ...[ 'b', ...[ 'c', ...Paths<number> ] ] ],
  e: [ 'e', ...[] ]
}
```

`...Paths<number>` is the same as `...[]` which is the same as `[]`.

Fourth iteration:

```ts
{
  a: [ 'a', ...[ 'b', ...[ 'c', ...[] ]]],
  e: [ 'e', ...[] ]
}
```

You can see where this is heading.

Look at `a` closely. It's a bit confusing. Step by step breakdown of the spreading:

1. `[ 'a', ...[ 'b', ...[ 'c'] ] ]`
2. `[ 'a', ...[ 'b', 'c' ] ]`
3. `[ 'a', 'b', 'c' ]`

At the end, we'll have this object:

```ts
{
  a: [ 'a', 'b', 'c' ],
  e: [ 'e' ]
}
```

Now, we need to turn this into a union type of its values. We do that by indexing the object with `[keyof T]`.

In human language, we're saying: "Give me the type of the values of the object".

One confusing aspect: How does indexing once result in a union type of the values?

It doesn't index once.

`[keyof T]` doesn't mean "index once". It means "index for each key in the object". Essentially, looping over the object and indexing each key.

```ts
{ [K in keyof T]: [K, ...Paths<T[K]>] }[keyof T]
```
