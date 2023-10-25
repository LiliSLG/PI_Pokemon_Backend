import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <Link className={style.navbar_links} to="/home">
      <p className={style.navbar_brand}>HOME</p>
      </Link>
      {/* <Link className={style.navbar_links} to="/create">Create</Link> */}
      
      <Link className={style.navbar_links} to="/about">
       <p className={style.navbar_brand}>ABOUT</p>
      </Link>
    </div>
  );
};
export default NavBar;
