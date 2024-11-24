/**
 * Sets a successful HTTP response with the provided data.
 * @param {Object} data - The payload to be sent back in the response body.
 * @param {Object} response - The Express response object used to send the data.
 */
export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

/**
 * Sets an error HTTP response with a generic internal server error message.
 * @param {Error} err - The error object that triggered the error response.
 * @param {Object} response - The Express response object used to send the error details.
 */
export const setError = (err, response) => {
    console.log(err);
    response.status(500);
    response.json({
        error: {
            code: 'InternalServerError',
            message: 'Error occured while processing the request'
        }
    })
}