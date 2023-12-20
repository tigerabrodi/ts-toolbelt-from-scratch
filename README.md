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
