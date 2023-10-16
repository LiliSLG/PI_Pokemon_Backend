import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.search_box}>
      <Link to="/home">Home</Link>
      <Link to="/create">Create</Link>
    </div>
  );
};
export default NavBar;
