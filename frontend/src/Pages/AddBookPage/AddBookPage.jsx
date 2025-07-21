import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AddBookPage.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const AddBookPage = () => {
  const location = useLocation();
  const book = location.state;

  const [formData, setFormData] = useState({
    name: book?.name || "",
    price: book?.price || "",
    image: book?.image || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      name: book?.name || "",
      price: book?.price || "",
      image: book?.image || "",
    });
    setError("");
    setSuccess("");
  }, [book]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      setError("All fields are required.");
      return;
    }

    if (book) {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/books/${book._id}`,
          formData
        );
        if (res.data.success) {
          setSuccess("Book Edited successfully.");
          setFormData({ name: "", price: "", image: "" });
        } else {
          setError("Failed to edit book.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Try again later.");
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/books",
          formData
        );
        if (res.data.success) {
          setSuccess("Book added successfully.");
          setFormData({ name: "", price: "", image: "" });
        } else {
          setError("Failed to add book.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <motion.div
      className="add-book"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="add-book__title">{book ? "Edit Book" : "Add New Book"}</h1>

      <form className="add-book__form" onSubmit={handleSubmit}>
        <div className="add-book__field">
          <label htmlFor="name" className="add-book__label">
            Book Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="add-book__input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter book name"
          />
        </div>

        <div className="add-book__field">
          <label htmlFor="price" className="add-book__label">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="add-book__input"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div className="add-book__field">
          <label htmlFor="image" className="add-book__label">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            className="add-book__input"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        {error && <p className="add-book__error">{error}</p>}
        {success && <p className="add-book__success">{success}</p>}

        <button type="submit" className="add-book__submit">
          {book ? "Edit Book" : "Add Book"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddBookPage;
