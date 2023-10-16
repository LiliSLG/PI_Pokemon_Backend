import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./Home.module.css";
import { CardsContainer } from "../../components";
import { getPokemons, getTypes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  // cuando se monta, hace el dispach de los pokemones y types
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  

  return (
    <>
      <h1 className={style.home_title}>Vista Home</h1>
      <CardsContainer />
    </>
  );
};
export default Home;
