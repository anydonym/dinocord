/**
 * Bitwise check, returning the keys of the specified enum which sum of their values are equal to `number`. Can also be used to check validity.
 * @param number The bitwise number sum.
 * @param object The enum of bitwise values.
 * @returns The enum keys which their values when summed up are equal to `number`.
 */
export default function (number: number, object: object) {
  const arr: [keyof typeof object | string, number][] = [];
  let num: number = number;

  for (const i in object) {
    if (typeof i == "string" && typeof object[i as keyof object] == "number") {
      arr.push([i, object[i as keyof typeof object]]);
    }
  }

  const has = arr
    .sort((a, b) => b[1] - a[1])
    .flatMap((value) => {
      if (num - value[1] >= 0) {
        num -= value[1];
        return value[0];
      }
    })
    .filter((v) => v);

  return (num == 0) ? has : undefined;
}
