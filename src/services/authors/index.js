//here you crate the  api endpoints like:
// Create(POST) : http:localhost/authors + body
//Read all authors(GET) : http:localhost/authors
//Read one author(GET) : http:localhost/authors/:id
//Edit(PUT) : http:localhost/authors/:id + body
//Delete author(DELETE) : http:localhost/authors/:id
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
console.log(currentFilePath);

const currentDirPath = dirname(currentFilePath);
console.log("current path:", currentDirPath);

const authorsJSONFilePath = join(currentDirPath, "authors.json");
console.log("authors json path:", authorsJSONFilePath);

//1)
authorsRouter.post("/", (req, res, next) => {
  // read the request body

  try {
    const newAuthor = { ...req.body, id: uniqid(), createdAt: new Date() };
    console.log("new author:", newAuthor);

    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath));
    console.log("authors:", authors);
    authors.push(newAuthor);
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors));
    res.status(201).send({ id: newAuthor.id });
  } catch (error) {
    console.log(error);
  }
});
//2)
authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONFilePath); //if i console log this i'll see the hexadecimal of the content
  //console.log(fileContent);
  console.log(JSON.parse(fileContent));

  const authors = JSON.parse(fileContent);

  res.send(authors);
});
//3)
authorsRouter.get("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath));
  const author = authors.find((a) => a.id === req.params.authorId);

  console.log("authorId", req.params.authorId);
  res.send(author);
});
//4)
authorsRouter.put("/:authoeId", (req, res) => {
  res.send("this PUT methond ");
});
//5)
authorsRouter.delete("/:authorId", (req, res) => {
  //find author id and send as response

  res.send(author);
});

export default authorsRouter;
