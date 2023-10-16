import { Link } from "react-router-dom";
import style from "./Card.module.css";
const Card = (props) => {
  const { pokemon } = props;
  return (
    <div className={style.card_container}>
      <Link to={`/detail/${pokemon.id}`}>
        <p>Name: {pokemon.name}</p>
      </Link>
      {/* <div className={style.imageContainer}> */}
      <img className={style.cardImage} src={pokemon.image} alt={pokemon.name} />
      {/* </div> */}
      <div>
        <label>Types </label>
        {pokemon.types?.map((type) => (
          <div key={type.id}>{type.name}</div>
        ))}
      </div>
      <label>
        <input type="checkbox" checked={pokemon.created} />
        Created
      </label>
    </div>
  );
};
export default Card;
