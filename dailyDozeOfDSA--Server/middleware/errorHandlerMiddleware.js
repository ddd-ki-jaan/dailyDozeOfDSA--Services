import { StatusCodes } from "http-status-codes";

// error handling middleware is a catch-all for handling unexpected errors that occur during request processing.
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.message || 'somehting went wrong, try again later';
    res.status(statusCode).json({ msg });
}

export default errorHandlerMiddleware;
