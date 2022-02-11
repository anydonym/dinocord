/**
 * Discord HTTP response headers.
 * @link https://discord.com/developers/docs/topics/rate-limits#header-format Ratelimit headers.
 */
enum HTTPHeaders {
	/** The number of requests that can be made. */
	RATELIMIT_LIMIT = 'X-RateLimit-Limit',
	/** The number of **remaining** requests that can be made. */
	RATELIMIT_REMAINING = 'X-RateLimit-Remaining',
	/** Epoch time the ratelimit will reset. */
	RATELIMIT_RESET = 'X-RateLimit-Reset',
	/** The total time (in seconds) the ratelimit will reset. */
	RATELIMIT_RESET_AFTER = 'X-RateLimit-Reset-After',
	/** A unique string denoting the ratelimit being encountered (non-inclusive of major parameters in the route path). */
	RATELIMIT_BUCKET = 'X-RateLimit-Bucket',
	/** Whether the ratelimit is applied globally or per-route. Returned only on HTTP 429 responses. */
	RATELIMIT_GLOBAL = 'X-RateLimit-Global',
	/** Whether the ratelimit is per-user limit (`user`), per-user global limit (`global`) or per-resource limit (`shared`). Returned only on HTTP 429 respones. */
	RATELIMIT_SCOPE = 'X-RateLimit-Scope',
}

export default HTTPHeaders;
