import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <h1>BookLedger</h1>
      </div>

      <div className="navbar__buttons">
        <button
          onClick={() => navigate("/add", { state: null })}
          className="navbar__button"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
