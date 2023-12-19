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
