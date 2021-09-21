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
//--------------------------GLOBAL MIDDLEWARES---------------------------------
const server = express();
const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];
const corsOptions = {
  origin: function (origin, next) {
    console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error(`origin ${origin} not allowed`));
    }
  },
};
// const port = process.env.PORT_NUM || 3001;
server.use(cors(corsOptions)); //should be here to able to communicate Front-End with back-end
server.use(express.json()); // if i do not specify this line before routes,all the request bodies will be undefined

server.use("/authors", authorsRouter);
server.use("/blogposts", postRouter);
//-------------------ERROR MIDDLEWARES(HANDLERS)-------------------------------
server.use(badRequestError);
server.use(notFoundErrorHandlerMiddleware);
server.use(forbiddenErrorHandlerMiddleware);
server.use(genericErrorHandlerMiddleware);
console.table(listEndpoints(server));

server.listen(process.env.PORT_NUM || 5000, () => {
  console.log(`server running on ${process.env.PORT_NUM}`);
});
