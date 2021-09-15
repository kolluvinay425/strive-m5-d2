import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./services/authors/index.js";
import postRouter from "./services/posts/index.js";
const server = express();
const port = 3001;
// server.use(cors);
// server.use(express.json());

server.use(express.json()); // if i do not specify this line before routes,all the request bodies will be undefined

server.use("/authors", authorsRouter);
server.use("/posts", postRouter);
console.table(listEndpoints(server));
server.listen(port, () => {
  console.log(`server running on ${port}`);
});
