import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const postRouter = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);

const currentDirPath = dirname(currentFilePath);

const path = join(currentDirPath, "posts.json");
console.log("posts-------->", path);

//Post
postRouter.post("/", (req, res) => {
  try {
    const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };
    const posts = JSON.parse(fs.readFileSync(path));
    posts.push(newPost);
    fs.writeFileSync(path, JSON.stringify(posts));
    res.status(201).send({ newPost });
  } catch (error) {
    console.log(error);
  }
});
//GET
postRouter.get("/", (req, res) => {
  try {
    const allPosts = fs.readFileSync(path);
    const posts = JSON.parse(allPosts);
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
  console.log("this is GET method");
});
// get
postRouter.get("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(path));
  const singlePost = posts.find((p) => p.id === req.params.id);
  res.send(singlePost);
  console.log(singlePost);
});
//put
postRouter.put("/:id", (req, res) => {
  // read the posts.json file content to get back an array of posts
  const posts = JSON.parse(fs.readFileSync(path));
  const remainingPosts = posts.filter((p) => p.id !== req.params.id);
  const updatePost = { ...req.body, id: req.params.id };
  remainingPosts.push(updatePost);
  fs.writeFileSync(path, JSON.stringify(remainingPosts));
  res.send(updatePost);
  console.log("this is PUT method");
});
//DELETE
postRouter.delete("/:id", (req, res) => {
  //Read the posts file;
  const posts = JSON.parse(fs.readFileSync(path));
  //filter the specified post id from the array
  const singlePost = posts.filter((p) => p.id !== req.params.id);
  //write the remaining posts into the file
  fs.writeFileSync(path, JSON.stringify(singlePost));
  res.status(204).send();
});
export default postRouter;
