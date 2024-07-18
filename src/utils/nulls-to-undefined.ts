export function nullsToUndefined<T>(obj: T) {
  const result: Record<string, unknown> = {}

  for (const key in obj) {
    result[key] = obj[key] === null ? undefined : obj[key]
  }

  return result as ReplaceNullWithUndefined<T>
}

type ReplaceNullWithUndefined<T> = {
  [P in keyof T]: T[P] extends NonNullable<T[P]>
    ? T[P]
    : T[P] extends infer U | null
      ? U | undefined
      : T[P]
}
