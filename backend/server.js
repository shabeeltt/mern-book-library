import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Book from "./models/book.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json()); // allow us to accept json data in the request body

//create book
app.post("/api/books", async (req, res) => {
  const book = req.body; //user will send this data
  if (!book.name || !book.price || !book.image) {
    return res
      .status(400) //bad request
      .json({ success: false, message: "Please provide all fields" });
  }
  const newBook = new Book(book);

  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook }); //status code 201 - book created
  } catch (error) {
    console.error("Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); //status code 500 server error
  }
});

//delete book
app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid book ID" });
  }
  try {
    const bookDeleted = await Book.findByIdAndDelete(id);

    if (!bookDeleted) {
      return res
        .status(404) //not found
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, message: "Book deleted" }); //status code 200 ok , request successful
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});

// get all the books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({});
    if (books.length <= 0) {
      return res.status(404).json({ success: false, message: "NO Book found" });
    }
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("server started at http://localhost:3000/");
});
