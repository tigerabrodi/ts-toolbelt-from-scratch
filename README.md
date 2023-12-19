# TS Toolbelt from Scratch

Just having fun with TypeScript types.

Taking some notes on my learnings too.

## Distributive Property

The distributive property in TypeScript refers to how conditional types are applied to union types. When you have a conditional type and the type you are checking is a union, TypeScript will distribute the conditional type over each member of the union. This is a unique behavior in TypeScript's type system.

Given a conditional type of the form `T extends U ? X : Y` and a union type `A | B | C` for `T`, TypeScript will distribute the conditional type over each member of the union. Essentially, it checks the condition for each member of the union independently.
