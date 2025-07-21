import { useState, useEffect } from "react";
import "./HomePage.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import ConfirmPopup from "../../Components/Navbar/ConfirmPopup/ConfirmPopup";
import { useNavigate } from "react-router-dom";

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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3000/api/books");
    return res.data;
  };

  const handleEdit = (book) => {
    navigate("/add", { state: book });
  };

  const handleDelete = (bookId) => {
    setSelectedBookId(bookId);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/books/${selectedBookId}`
      );

      if (res.data.success) {
        console.log("Deleted:", res.data.message);
        // Update your local state to remove the book from UI
        setBooks((prev) => prev.filter((book) => book._id !== selectedBookId));
      } else {
        console.error("Delete failed:", res.data.message);
      }
    } catch (err) {
      console.error("Error deleting:", err.message);
    } finally {
      setShowPopup(false);
      setSelectedBookId(null);
    }
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

  return (
    <>
      <motion.div
        className="home"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="home__container">
          {loadingBooks ? (
            <div className="home__status">Loading...</div>
          ) : error ? (
            <div className="home__status home__status--error">{error}</div>
          ) : (
            <div className="home__grid">
              {books.map((item) => (
                <div key={item._id} className="home__card">
                  <div className="home__actions">
                    <MdEdit
                      className="home__icon"
                      onClick={() => handleEdit(item)}
                    />
                    <MdDeleteOutline
                      className="home__icon"
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                  <div className="home__image">
                    <img src={item.image} alt={item.image} />
                  </div>
                  <div className="home__info">
                    <p className="home__price">₹ {item.price}</p>
                    <h2 className="home__title">{item.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* ⬇️ MOVE POPUP OUTSIDE .home TO FIX POSITIONING */}
      {showPopup && (
        <ConfirmPopup
          message="Are you sure you want to delete this book?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowPopup(false);
            setSelectedBookId(null);
          }}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default HomePage;
