import { useSelector } from "react-redux";
// import { pokemonData } from "../../pokemonData";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
const CardsContainer = () => {
  const pokemonData = useSelector((state) => state.pokemons);

  return (
    <div className={style.card_list}>
      {pokemonData.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};
export default CardsContainer;
