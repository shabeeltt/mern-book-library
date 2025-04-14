import Book from "../models/book.model.js";
import mongoose from "mongoose";

// get all the books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (books.length <= 0) {
      return res.status(404).json({ success: false, message: "NO Book found" });
    }
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//create a book
export const createBook = async (req, res) => {
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
};

//delete a book
export const deleteBook = async (req, res) => {
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
};

//update a book
export const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid book ID" });
  }

  const book = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book Not Found" });
    }

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
