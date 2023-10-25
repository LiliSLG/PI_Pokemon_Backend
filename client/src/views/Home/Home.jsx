import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./Home.module.css";
import { CardsContainer, Footer } from "../../components";
import { handleSetFooterAppStatus } from "../../handlers/handleFooterMessages";
// import { setAppStatus } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleSetFooterAppStatus(dispatch, "READY", 1);
  });

  return (
    <div>
      <CardsContainer />
    </div>
  );
};
export default Home;
