import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./services/authors/index.js";
import postRouter from "./services/posts/index.js";
import {
  notFoundErrorHandlerMiddleware,
  forbiddenErrorHandlerMiddleware,
  genericErrorHandlerMiddleware,
  badRequestError,
} from "./services/errorHandlers.js";
const server = express();
const port = 3001;
server.use(cors()); //should be here to able to communicate Front-End with back-end
server.use(express.json()); // if i do not specify this line before routes,all the request bodies will be undefined

server.use("/authors", authorsRouter);
server.use("/blogposts", postRouter);

server.use(badRequestError);
server.use(notFoundErrorHandlerMiddleware);
server.use(forbiddenErrorHandlerMiddleware);
server.use(genericErrorHandlerMiddleware);
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
