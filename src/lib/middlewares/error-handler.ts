// import inbuilt modules
// import custom modules
export const ErrorHandler = (error, req, res, next) => {
    const StatusCode: number = error.statusCode || 500;
    console.error({
        error: error.message,
        statusCode: error.statusCode,
        url: req.url,
        stack: error.stack
    });
    const { error_message, error_code, errors } = error;
    return res.status(StatusCode).send({ error_message, error_code, errors });
};
