import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonById, pokemonDelete } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, []);

  const pokemonDetails = useSelector((state) => state.pokemonDetail);

const handleDelete = async (event) => {
  event.preventDefault();
  try {
    const confirmed = window.confirm("Are you sure you want to delete this Pokemon?");
    if (confirmed) {
      await dispatch(pokemonDelete(id));
      alert("Pokemon deleted!");
      // <Link to="/home" />
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again later.");
  }
};

  // const handleModify = (event) => {
  //   event.preventDefault();
  //   const goTo = `/update/${pokemonDetails.id}`;
  //   return (<Navigate to={goTo}>);
  // };

  return (
    <div>
      <h1> Detalle de Pokemon</h1>
      <div>
        <p>{pokemonDetails.name}</p>
      </div>
      <div>
        <div>
          <img
            src={pokemonDetails.image}
            alt={`Imagen de ${pokemonDetails.name}`}
          />
        </div>
        <label>
          <input type="checkbox" checked={pokemonDetails.created} />
          Created
        </label>
        <div>
          <div>
            <p>HP</p>
            <p>{pokemonDetails.hp}</p>
          </div>
          <div>
            <p>HEIGHT</p>
            <p>{pokemonDetails.height}</p>
          </div>
          <div>
            <p>WEIGHT</p>
            <p>{pokemonDetails.weight}</p>
          </div>
          <div>
            <p>ATTACK</p>
            <p>{pokemonDetails.attack}</p>
          </div>
          <div>
            <p>DEFENSE</p>
            <p>{pokemonDetails.defense}</p>
          </div>
          <div>
            <p>SPEED</p>
            <p>{pokemonDetails.speed}</p>
          </div>
        </div>
        <div>
          <p>TYPES</p>
          <div>
            {pokemonDetails.types?.map((type) => {
              return <div key={type.id}>{type.name}</div>;
            })}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          DELETE
        </button>
        <Link to={`/update/${pokemonDetails.id}`}>
          <button
            // onClick={(e) => {handleModify(e);} }
          >
            MODIFY
          </button>
        </Link>
      </div>

    </div>
  );
};
export default Detail;
