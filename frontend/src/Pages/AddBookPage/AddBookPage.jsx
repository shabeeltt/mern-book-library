import "./AddBookPage.scss";
import { motion } from "framer-motion";

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

const AddBookPage = () => {
  return (
    <motion.div
      className="add"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      create page
    </motion.div>
  );
};

export default AddBookPage;
