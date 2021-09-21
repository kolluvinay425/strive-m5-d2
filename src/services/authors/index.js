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
import createHttpError from "http-errors";
const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
console.log("import...", import.meta.url);
console.log("current path...", currentFilePath);

const currentDirPath = dirname(currentFilePath);
console.log("current dir:", currentDirPath);

const authorsJSONFilePath = join(currentDirPath, "authors.json");
console.log("authors json path:", authorsJSONFilePath);
// jsonPath = join(dirname(fileUrlToPath(import.meta.url),"authors.json"))//single code
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
    res.status(201).send({ newAuthor });
  } catch (error) {
    next(error);
  }
});
//2)
authorsRouter.get("/", (req, res, next) => {
  try {
    const fileContent = fs.readFileSync(authorsJSONFilePath); //if i console log this i'll see the hexadecimal of the content
    //console.log(fileContent);
    console.log(JSON.parse(fileContent));

    const authors = JSON.parse(fileContent);

    res.send(authors);
  } catch (error) {
    next(error);
  }
});
//3)
authorsRouter.get("/:authorId", (req, res, next) => {
  try {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath));
    const author = authors.find((a) => a.id === req.params.authorId);
    if (author) {
      res.send(author);
    } else {
      next(
        createHttpError(404, `post with id:${req.params.authorId} not found`)
      );
    }
    console.log("authorId", req.params.authorId);
  } catch (error) {
    next(error);
  }
});
//4)
authorsRouter.put("/:authorId", (req, res) => {
  try {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath));
    const remaingAuthors = authors.filter((a) => a.id !== req.params.authorId);
    const updateAuthor = { ...req.body, id: req.params.authorId };
    remaingAuthors.push(updateAuthor);
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(remaingAuthors));
    res.send(remaingAuthors);
    res.send("this PUT methond ");
  } catch (error) {
    next(error);
  }
});
//5)
authorsRouter.delete("/:authorId", (req, res) => {
  try {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath));
    const singleAuthor = authors.filter((a) => a.id !== req.params.authorId);
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(singleAuthor));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
  //find author id and send as response
});

export default authorsRouter;
