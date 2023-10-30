import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.container}>
      <img
        src="assets/International_Pokémon_logo.svg"
        alt="Logo"
        className={style.logo}
      />
      {/* <h1>Landing Page</h1> */}
      <Link className={style.navbar_links} to="/home">
        <p className={style.navbar_brand}>ENTER</p>
      </Link>
      <h3 className={style.footer}>Proyecto individual de Bootcamp HENRY</h3>
    </div>
  );
};
export default LandingPage;
