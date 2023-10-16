import { useEffect, useState } from "react";
import { useParams, useHistory  } from "react-router-dom";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { validateNewPokemon } from "../../utils/validatePokemon.js";
import { createPokemon, updatePokemon } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const types = useSelector((state) => state.types);
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  const initialFormState = {
    name: "",
    image: "",
    height: 1,
    weight: 1,
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    types: [],
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const [isCreateForm, setCreateForm] = useState(true);

  useEffect(() => {
    if (id) {
      //si hay id es formulario de actualizacion
      //por ahora funciona para los created
      setCreateForm(false);
      setForm(pokemonDetail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const types = form.types.map((type) => type.id);
    form.types = types;
    try {
      if (isCreateForm) {
        await dispatch(createPokemon(form));
        alert("New Pokemon created!");
      } else {
        await dispatch(updatePokemon(form));
        alert("Pokemon updated!");
      }
       setForm(initialFormState);
       history.push('/home');
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    const errors = validateNewPokemon(updatedForm);
    setErrors(errors);
    setForm(updatedForm);
  };

  function handleCheck(event) {
    const updatedTypes = event.target.checked
      ? [...form.types, { id: event.target.id, name: event.target.value }]
      : form.types.filter((type) => type.name !== event.target.value);

    const errors = validateNewPokemon({
      ...form,
      types: updatedTypes,
    });

    setForm({
      ...form,
      types: updatedTypes,
    });

    setErrors(errors);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1> Crear un nuevo Pokemon</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          // placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          name="image"
          type="text"
          value={form.image}
          onChange={handleChange}
        />
        {errors.image && <span>{errors.image}</span>}
      </div>
      <div>
        <label htmlFor="height">Height</label>
        <input
          name="height"
          type="number"
          min="0"
          max="999"
          // placeholder="Height"
          value={form.height}
          onChange={handleChange}
        />
        {errors.height && <span>{errors.height}</span>}
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input
          name="weight"
          type="number"
          min="0"
          max="999"
          // placeholder="Weight"
          value={form.weight}
          onChange={handleChange}
        />
        {errors.weight && <span>{errors.weight}</span>}
      </div>
      <div>
        <label htmlFor="hp">HP</label>
        <input
          name="hp"
          type="number"
          min="0"
          max="999"
          // placeholder="HP"
          value={form.hp}
          onChange={handleChange}
        />
        {errors.hp && <span>{errors.hp}</span>}
      </div>
      <div>
        <label htmlFor="attack">Attack</label>
        <input
          name="attack"
          type="number"
          min="0"
          max="999"
          // placeholder="Attack"
          value={form.attack}
          onChange={handleChange}
        />
        {errors.attack && <span>{errors.attack}</span>}
      </div>
      <div>
        <label htmlFor="defense">Defense</label>
        <input
          name="defense"
          type="number"
          min="0"
          max="999"
          // placeholder="Defense"
          value={form.defense}
          onChange={handleChange}
        />
        {errors.defense && <span>{errors.defense}</span>}
      </div>
      <div>
        <label htmlFor="speed">Speed</label>
        <input
          name="speed"
          type="number"
          min="0"
          max="999"
          // placeholder="Speed"
          value={form.speed}
          onChange={handleChange}
        />
        {errors.speed && <span>{errors.speed}</span>}
      </div>

      <div>
        <label htmlFor="types">Types</label>
        {types?.map((type) => {
          return (
            <div key={type.id}>
              <label>{type.name}</label>
              <input
                type="checkbox"
                id={type.id}
                value={type.name}
                onChange={handleCheck}
                // checked={form.types.includes(type.name)}
                checked={form.types.some((el) => el.name === type.name)}
              />
            </div>
          );
        })}
        {errors.types && <span>{errors.types}</span>}
      </div>
      <div>
        <button
          type="submit"
          disabled={!(Object.keys(errors).length === 0 && form.name !== "")}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};
export default Form;
