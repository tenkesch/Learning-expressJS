function generateResponse(res) {
	const responseMessage = {
		ok: res.ok,
		err: res.errors,
		message: res.message,
		body: res.body,
		statusCode: res.code,
	}

	return responseMessage
}

/*
	isOk,
	errors = null,
	message = 'No message',
	body = 'no Body',
    code
*/
