import { useState, useEffect } from "react";
import "./HomePage.scss";
import { motion } from "framer-motion";
import axios from "axios";

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
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loadingBooks, setLoadingBooks] = useState(false);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3000/api/books");
    return res.data;
  };

  useEffect(() => {
    setLoadingBooks(true);
    const getBooks = async () => {
      try {
        const response = await fetchBooks();
        if (response.success) {
          setBooks(response.data);
        } else {
          setError("No books found.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoadingBooks(false);
      }
    };

    getBooks();
  }, []);

  console.log(books);

  return (
    <motion.div
      className="home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {loadingBooks ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        books.map((item) => {
          return (
            <div
              style={{ backgroundColor: "gray", margin: "10px" }}
              key={item._id}
            >
              <h1>{item.name}</h1>
              <h2>{item.price}</h2>
            </div>
          );
        })
      )}
    </motion.div>
  );
};

export default HomePage;
