export function bigintToString<T extends object>(object: T) {
  let iobject = object;

  for (let i in iobject)
    if (typeof iobject[i] == 'bigint')
      /// @ts-ignore
      iobject[i] = iobject[i].toString();

  return iobject;
}

export default function json<T extends object>(object: T, filler: Partial<T>, transform: (object: T) => T = bigintToString) {
  return JSON.stringify(Object.assign(filler, transform(object)));
}