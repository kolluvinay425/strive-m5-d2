import express, { json } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import postValidationMiddleware from "./validation.js";

const postRouter = express.Router();
// const currentFilePath = fileURLToPath(import.meta.url);
// const currentDirPath = dirname(currentFilePath);
//const path = join(currentDirPath, "posts.json");

const path = join(dirname(fileURLToPath(import.meta.url)), "posts.json");
console.log("posts-------->", path);
const read = () => JSON.parse(fs.readFileSync(path));
const write = (content) => fs.writeFileSync(path, JSON.stringify(content));
//Post
postRouter.post("/", postValidationMiddleware, (req, res, next) => {
  try {
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      //if it is not empty ,we have validation errors(input)
      next(createHttpError(400, { errorList }));
    } else {
      const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };
      const posts = read();
      console.log("all posts from posts.json------>", newPost);
      posts.push(newPost);
      write(posts);
      res.status(201).send({ newPost });
    }
  } catch (error) {
    next(error);
  }
});
//GET
postRouter.get("/", (req, res, next) => {
  try {
    //const allPosts = fs.readFileSync(path);
    const posts = read();

    if (posts) {
      res.send(posts);
    } else {
      next(createHttpError(404, "POST NOT FOUND"));
    }
  } catch (error) {
    next(error);
  }
});
// get
postRouter.get("/:id", (req, res, next) => {
  try {
    const posts = read();
    const singlePost = posts.find((p) => p.id === req.params.id);
    if (singlePost) {
      res.send(singlePost);
    } else {
      next(createHttpError(404, `post ${req.params.id} not found`));
      console.log(singlePost);
    }
  } catch (error) {
    next(error);
  }
});
//put
postRouter.put("/:id", (req, res, next) => {
  // read the posts.json file content to get back an array of posts
  try {
    const posts = read();
    const remainingPosts = posts.filter((p) => p.id !== req.params.id);
    const updatePost = {
      ...req.body,
      id: req.params.id,
      updatedAt: new Date(),
    };
    remainingPosts.push(updatePost);
    write(remainingPosts);
    res.send(updatePost);
  } catch (error) {
    next(error);
  }
});
//DELETE
postRouter.delete("/:id", (req, res, next) => {
  try {
    //Read the posts file;
    const posts = JSON.parse(fs.readFileSync(path));
    //filter the specified post id from the array
    const singlePost = posts.filter((p) => p.id !== req.params.id);
    //write the remaining posts into the file
    fs.writeFileSync(path, JSON.stringify(singlePost));
    res.status(204).send("Deleted Successfully");
  } catch (error) {
    next(error);
  }
});
export default postRouter;
