export const badRequestError = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send("post not Found");
  } else {
    next(err);
  }
};

export const notFoundErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    res.send(404).send("server error");
  } else {
    next(err);
  }
  console.log(err);
};
export const forbiddenErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 403) {
    res.send(403).send("server error");
  } else {
    next(err);
  }
  console.log(err);
};
export const genericErrorHandlerMiddleware = (err, req, res, next) => {
  if (err.status === 500) {
    res.send(500).send("server error");
  } else {
    next(err);
  }
  console.log(err);
};
