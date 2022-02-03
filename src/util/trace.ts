// deno-lint-ignore ban-types
export default function trace(fn: Function) {
	const error = {}, error2 = {};
	Error.captureStackTrace(error, fn);
	Error.captureStackTrace(error2, trace);
	return (error as { stack: string }).stack.slice(6) + (error2 as { stack: string }).stack.slice(6);
}
