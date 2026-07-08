export function errorHandler(err, req, res, next) {
	if (res.headersSent) return next(err)

	const statusCode = err?.statusCode || err?.status || 500
	return res.status(statusCode).json({
		ok: false,
		message: err?.message || 'Server ran into Unexpected Error.',
		name: err?.name || 'Unexpected Error',
	})
}

export const Status = {
	OK: 200,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
}
