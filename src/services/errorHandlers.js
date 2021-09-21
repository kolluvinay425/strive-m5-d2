export const badRequestError = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ success: false, message: err.errorList });
  } else {
    next(err);
  }
};

export const notFoundErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    console.log(err.message);
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};
export const forbiddenErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send(err.message);
  } else {
    next(err);
  }
  // console.log(err);
};
export const genericErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send(err.message);
  } else {
    next(err);
  }
  // console.log(err);
};
