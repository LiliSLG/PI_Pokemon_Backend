import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./Card.module.css";
import { colorsByType } from "../../helpers/pokemonColorsByType";
import { pokemonClose, pokemonSaveToBdd } from "../../redux/actions";

const Card = (props) => {
  const { pokemon } = props;
  const dispatch = useDispatch();

  let colorType = pokemon.types
    ? colorsByType[pokemon.types[0].name]
    : "#000000";

  const handleClose = (id) => {
    dispatch(pokemonClose(id));
  };

  const handleSaveToBdd = (id) => {
    // try {
    dispatch(pokemonSaveToBdd(id));
    // } catch (error) {
    //   alert("Something went wrong. Please try again later.");
    // }
  };

  const renderTypes = () => {
    if (pokemon.types) {
      return pokemon.types.map((type) => (
        <img
          key={type.id}
          src={`assets/types/${type.name}.svg`}
          alt={type.name}
        />
      ));
    } else {
      return <span>Types not found</span>;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div>
          <div
            className={style.pokemonFondoColor}
            style={{ backgroundColor: colorType }}
          >
            <img
              className={style.cardImage}
              src={pokemon.image}
              alt={pokemon.name}
            />
          </div>
        </div>
        <div className={style.detalle}>
          <div>
            <button
              id="buttonClose"
              className={style.closeBtn}
              onClick={() => handleClose(pokemon.id)}
            >
              ✖️
            </button>
            {pokemon.created ? (
              pokemon.idAPI ? (
                <button id="buttonSave" className={style.saveFavorite}>
                  💚
                </button>
              ) : (
                <button id="buttonSave" className={style.saveFavorite}>
                  ❤️
                </button>
              )
            ) : (
              <button
                id="buttonSave"
                className={style.saveFavorite}
                onClick={() => handleSaveToBdd(pokemon)}
              >
                🩶
              </button>
            )}
          </div>
          <div>
            <h2> {pokemon.name.toLowerCase()}</h2>
          </div>
          <div>
            <p>Types:</p>
            <div>{renderTypes()}</div>
            {pokemon.created ? (
              pokemon.idAPI ? (
                <p>Copied from API</p>
              ) : (
                <p>Created</p>
              )
            ) : (
              <p>
                <b>#{pokemon.id}</b> from API
              </p>
            )}
          </div>
          <Link to={`/detail/${pokemon.id}`}>
            <button className={style.btnDetalle}>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
