import express, { json } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
const postRouter = express.Router();
// const currentFilePath = fileURLToPath(import.meta.url);
// const currentDirPath = dirname(currentFilePath);
//const path = join(currentDirPath, "posts.json");

const path = join(dirname(fileURLToPath(import.meta.url)), "posts.json");
console.log("posts-------->", path);
const read = () => JSON.parse(fs.readFileSync(path));
const write = (content) => fs.writeFileSync(path, JSON.stringify(content));
//Post
postRouter.post("/", (req, res, next) => {
  try {
    const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };
    const posts = read();
    posts.push(newPost);
    write(posts);
    res.status(201).send({ newPost });
    // const posts = JSON.parse(fs.readFileSync(path));
    // posts.push(newPost);
    // fs.writeFileSync(path, JSON.stringify(posts));
    // res.status(201).send({ newPost });
  } catch (error) {
    next(error);
  }
});
//GET
postRouter.get("/", (req, res, next) => {
  try {
    const allPosts = fs.readFileSync(path);
    const posts = JSON.parse(allPosts);
    if (posts) {
      res.send(posts);
    } else {
      next(createHttpError(401, "post not found"));
    }
  } catch (error) {
    next(error);
  }
});
// get
postRouter.get("/:id", (req, res, next) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path));
    const singlePost = posts.find((p) => p.id === req.params.id);
    if (singlePost) {
      res.send(singlePost);
    } else {
      next(createHttpError(404, "post id not found"));
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
    const posts = JSON.parse(fs.readFileSync(path));
    const remainingPosts = posts.filter((p) => p.id !== req.params.id);
    const updatePost = { ...req.body, id: req.params.id };
    remainingPosts.push(updatePost);
    fs.writeFileSync(path, JSON.stringify(remainingPosts));
    res.send(updatePost);
    console.log("this is PUT method");
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
