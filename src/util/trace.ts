// deno-lint-ignore ban-types
export default function trace(fn: Function) {
	const error = {};
	Error.captureStackTrace(error, fn);
	return (error as { stack: string }).stack.slice(6);
}
