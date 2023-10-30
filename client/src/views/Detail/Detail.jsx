import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import style from "./Detail.module.css";
import {
  getPokemonById,
  pokemonDelete,
  pokemonClear,
} from "../../redux/actions";
import { ProgressBar } from "../../components/bars";
import {
  renderTypeLabels,
  colorsByType,
} from "../../helpers/pokemonColorsByType";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const pokemonDetail = useSelector((state) => state.pokemon.pokemonDetail);
  const [refresh, setRefresh] = useState(false);

  let colorType = pokemonDetail.types
    ? colorsByType[pokemonDetail.types[0].name]
    : "#000000";

  // const [colorType, setColorType] = useState("#00b4db");

  useEffect(() => {
    dispatch(getPokemonById(id)).then(() => {
      // setColorType(colorsByType[pokemonDetail.types[0].name])
      setRefresh(true);
    });
    // return () => {
    //   dispatch(pokemonClear());
    // }
  }, []);

  const handleClose = () => {
    history.push("/home");
  };

  const handleTypeClick = (event) => {
    // const { alt } = event.target;
    // if (alt) {
    //   setColorType(colorsByType[alt]);
    // }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!pokemonDetail.created) {
      alert("This Pokemon is from API and cant be deleted!");
      return;
    }
    // try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Pokemon?"
    );
    if (confirmed) {
      dispatch(pokemonDelete(id));
      alert("Pokemon deleted!");
      handleClose();
    }
    // } catch (error) {
    //   console.error(error);
    //   alert("Something went wrong. Please try again later.");
    // }
  };

  return (
    <div>
      {/* <h1 className={style.title}> Detalle de Pokemon</h1> */}
      {refresh && (
        <div className={style.card}>
          <div
            className={style.leftPanel}
            style={{ backgroundColor: colorType }}
          >
            <div>
              <p className={style.titleName}>
                {pokemonDetail.name.toUpperCase()}
              </p>
            </div>
            <img
              src={pokemonDetail.image}
              alt={`Imagen de ${pokemonDetail.name}`}
            />
          </div>

          <div className={style.rigthPanel}>
            <div className={style.closeContainer} >
              <button
                id="buttonClose"
                className={style.closeBtn}
                onClick={handleClose}
              >
                ✖️
              </button>
            </div>
            <div>
              <p className={style.titleCard} style={{ color: colorType }}>
                Detailed information about {pokemonDetail.name.toUpperCase()}
              </p>
            </div>
            <div>
              <div className={style.pesoAltura}>
                <div>
                  <p className={style.description}>HEIGHT</p>
                  <p>↕️ {pokemonDetail.height} cm.</p>
                </div>
                <div>
                  <p className={style.description}>WEIGHT</p>
                  <p>🪨 {pokemonDetail.weight} gr.</p>
                </div>
              </div>
              <div className={style.stats}>
                {/* <p className={style.description}>STATS</p> */}
                <div>
                  <p className={style.description}>HIT POINTS</p>
                  <ProgressBar
                    color={colorType}
                    total={100}
                    value={pokemonDetail.hp}
                  />
                </div>
                <div>
                  <p className={style.description}>ATTACK</p>
                  <ProgressBar
                    color={colorType}
                    total={100}
                    value={pokemonDetail.attack}
                  />
                </div>
                <div>
                  <p className={style.description}>DEFENSE</p>
                  <ProgressBar
                    color={colorType}
                    total={100}
                    value={pokemonDetail.defense}
                  />
                </div>
                <div>
                  <p className={style.description}>SPEED</p>
                  <ProgressBar
                    color={colorType}
                    total={100}
                    value={pokemonDetail.speed}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className={style.description}>TYPES</p>
              <div className={style.types}>
                {renderTypeLabels(pokemonDetail, handleTypeClick)}
              </div>
            </div>
            <div>
              <button
                className={style.btns}
                style={{ backgroundColor: colorType }}
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                DELETE
              </button>
              <Link to={`/update/${pokemonDetail.id}`}>
                <button
                  className={style.btns}
                  style={{ backgroundColor: colorType }}
                >
                  MODIFY
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
