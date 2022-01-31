export function bigintToString<
	T extends Record<string | number | symbol, unknown>,
>(object: T) {
	const iobject = object;

	for (const i in iobject) {
		if (typeof iobject[i] == 'bigint') {
			/// @ts-ignore Deliberate assignment - should work without any error.
			iobject[i] = iobject[i].toString();
		}
	}

	return iobject;
}

export default function <T extends Record<string | number | symbol, unknown>>(
	object: T,
	filler: Partial<T>,
	transform: (object: T) => T = bigintToString,
) {
	return JSON.stringify(Object.assign(filler, transform(object)));
}
