const errorHandler = (err, req, res, next) => {

    const error = { ...err };
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;


    if(err.name === "ValidationError") {
        error.message = Object.values(err.errors).map((val) => val.message).join(", ");
        error.statusCode = 400;
    }
    if (err.name === "CastError") {
        error.message = `Resource not found with id of ${err.value}`;
        error.statusCode = 404;
    }

    if(err.code === 11000) {
        error.message = "Duplicate field value entered";
        error.statusCode = 400;
    }
    if(err.name === "JsonWebTokenError") {
        error.message = "Invalid token";
        error.statusCode = 401;
    }



  console.error(err.stack);
  res.status(error.statusCode).json({ status: "fail", message: error.message });

}
export default errorHandler;