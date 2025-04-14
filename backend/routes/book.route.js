import express from "express";

import {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();
//create book
router.post("/", createBook);

//delete book
router.delete("/:id", deleteBook);

// get all the books
router.get("/", getBooks);

// update the book
router.put("/:id", updateBook);

export default router;
