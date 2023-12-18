type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
  ? [FirstPart, SecondPart]
  : never

type Replace<
  Full extends string,
  From extends string,
  To extends string
> = Full extends `${infer Beginning}${From}`
  ? `${Beginning}${To}`
  : Full extends `${From}${infer End}`
  ? `${From}${End}`
  : Full extends `${infer Beginning}${From}${infer End}`
  ? `${Beginning}${From}${End}`
  : never

type Length<S extends string> = S['length']

type Includes<
  FullString extends string,
  IncludePart extends string
> = FullString extends `${infer Beginning}${IncludePart}${infer End}`
  ? true
  : false

type UpperCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${UpperCase<Rest>}`
  : S

type LowerCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${LowerCase<Rest>}`
  : S

type StartsWith<
  Full extends string,
  Start extends string
> = Full extends `${Start}${infer Rest}` ? true : false

type EndsWith<
  Full extends string,
  End extends string
> = Full extends `${infer Start}${End}` ? true : false

// Example usages
type TestSplit = Split<'hello-world', '-'> // Result: ['hello', 'world']

type TestReplace = Replace<'TypeScript', 'Script', 'Toolbelt'> // Result: 'TypeToolbelt'

type TestLength = Length<'hello'> // Result: 5

type TestIncludes = Includes<'hello world', 'world'> // Result: true

type TestUpperCase = UpperCase<'typescript'> // Result: 'TYPESCRIPT'

type TestLowerCase = LowerCase<'TYPESCRIPT'> // Result: 'typescript'

type TestStartsWith = StartsWith<'hello world', 'hello'> // Result: true

type TestEndsWith = EndsWith<'hello world', 'world'> // Result: true
