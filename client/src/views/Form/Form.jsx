import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import { validatePokemon } from "../../helpers/";
import { createPokemon, updatePokemon } from "../../redux/actions";
import { colorsByType } from "../../helpers/pokemonColorsByType";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const types = useSelector((state) => state.pokemon.types);
  const pokemonDetail = useSelector((state) => state.pokemon.pokemonDetail);

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
      if (!pokemonDetail.created) {
        alert(
          "Attention! This Pokemon was copied from the Pokemon API. It would be good if you didn't modify their original values!"
        );
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const types = form.types.map((type) => type.id);
    form.types = types;
    try {
      if (isCreateForm) {
        dispatch(createPokemon(form)).then(alert("New Pokemon created!"));
      } else {
        dispatch(updatePokemon(form)).then(alert("Pokemon updated!"));
      }
      setForm(initialFormState);
      history.push("/home");
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
    const errors = validatePokemon(updatedForm);
    setErrors(errors);
    setForm(updatedForm);
  };

  const [colorType, setColorType] = useState("#00b4db");

  function handleCheck(event) {
    const isChecked = event.target.checked;
    const targetType = event.target.value;

    if (isChecked) {
      setColorType(colorsByType[targetType]);
    }

    const updatedTypes = isChecked
      ? [...form.types, { id: event.target.id, name: targetType }]
      : form.types.filter((type) => type.name !== targetType);

    const updatedForm = {
      ...form,
      types: updatedTypes,
    };

    const errors = validatePokemon(updatedForm);

    setForm(updatedForm);
    setErrors(errors);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // const imageData = reader.result;
        const updatedForm = {
          ...form,
          image: file.name,
        };
        const errors = validatePokemon(updatedForm);

        setErrors(errors);
        setForm(updatedForm);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    history.push("/home");
  };

  return (
    <form className={style.card} onSubmit={handleSubmit}>
      <div
        className={style.leftPanel}
        style={{
          backgroundColor: colorType,
        }}
      >
        <div>
          <p className={style.titleName}>{form.name.toUpperCase()}</p>
        </div>
        <img src={form.image} alt={form.name} />
      </div>

      <div className={style.rigthPanel}>
        <div className={style.closeContainer}>
          <button
            id="buttonClose"
            className={style.closeBtn}
            onClick={handleClose}
          >
            ✖️
          </button>
        </div>
        <div>
          {isCreateForm ? (
            <h1
              className={style.titleCard}
              style={{
                color: colorType,
              }}
            >
              Crear un nuevo Pokemon
            </h1>
          ) : (
            <h1
              className={style.titleCard}
              style={{
                color: colorType,
              }}
            >
              Modificar {form.name.toUpperCase()}
            </h1>
          )}
        </div>
        <div>
          <label className={style.description} htmlFor="name">
            NAME
          </label>
          <input
            className={errors.name && style.warning}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className={errors.name && style.danger}>{errors.name}</p>
          )}
        </div>
        <div>
          <label className={style.description} htmlFor="image">
            IMAGE
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            className={errors.image && style.warning}
            onChange={handleChange}
          />
          {errors.image && (
            <p className={errors.image && style.danger}>{errors.image}</p>
          )}
        </div>
        <div className={style.pesoAltura}>
          <div>
            <label className={style.description} htmlFor="height">
              HEIGHT ↕️
            </label>
            <input
              class={style.inputPesoAltura}
              name="height"
              type="number"
              min="0"
              // max="1500"
              value={form.height}
              className={errors.height && style.warning}
              onChange={handleChange}
            />
            <label className={style.description} htmlFor="height">
              cm.
            </label>
            {errors.height && (
              <p className={errors.height && style.danger}>{errors.height}</p>
            )}
          </div>
          <div>
            <label className={style.description} htmlFor="weight">
              WEIGHT 🪨
            </label>
            <input
              class={style.inputPesoAltura}
              name="weight"
              type="number"
              min="0"
              // max="1000000"
              value={form.weight}
              className={errors.weight && style.warning}
              onChange={handleChange}
            />
            <label className={style.description} htmlFor="weight">
              gr.
            </label>
            {errors.weight && (
              <p className={errors.weight && style.danger}>{errors.weight}</p>
            )}
          </div>
        </div>
        <div className={style.stats}>
          <div>
            <label className={style.description} htmlFor="hp">
              HIT POINTS
            </label>
            <input
              name="hp"
              type="number"
              min="0"
              max="999"
              // placeholder="HP"
              value={form.hp}
              className={errors.hp && style.warning}
              onChange={handleChange}
            />
            {errors.hp && (
              <p className={errors.hp && style.danger}>{errors.hp}</p>
            )}
          </div>
          <div>
            <label className={style.description} htmlFor="attack">
              ATTACK
            </label>
            <input
              name="attack"
              type="number"
              min="0"
              max="999"
              // placeholder="Attack"
              value={form.attack}
              className={errors.attack && style.warning}
              onChange={handleChange}
            />
            {errors.attack && (
              <p className={errors.attack && style.danger}>{errors.attack}</p>
            )}
          </div>
          <div>
            <label className={style.description} htmlFor="defense">
              DEFENSE
            </label>
            <input
              name="defense"
              type="number"
              min="0"
              max="999"
              // placeholder="Defense"
              value={form.defense}
              className={errors.defense && style.warning}
              onChange={handleChange}
            />
            {errors.defense && (
              <p className={errors.defense && style.danger}>{errors.defense}</p>
            )}
          </div>
          <div>
            <label className={style.description} htmlFor="speed">
              SPEED
            </label>
            <input
              name="speed"
              type="number"
              min="0"
              max="999"
              // placeholder="Speed"
              value={form.speed}
              className={errors.speed && style.warning}
              onChange={handleChange}
            />
            {errors.speed && (
              <p className={errors.speed && style.danger}>{errors.speed}</p>
            )}
          </div>
        </div>
        <div>
          <label className={style.description} htmlFor="types">
            TYPES
          </label>
          <div className={style.types}>
            {types?.map((type) => {
              return (
                <div key={type.id}>
                  <input
                    type="checkbox"
                    style={{
                      margin: "5px",
                      verticalAlign: "middle",
                    }}
                    id={type.id}
                    value={type.name}
                    onChange={handleCheck}
                    // checked={form.types.includes(type.name)}
                    checked={form.types.some((el) => el.name === type.name)}
                  />
                  <label for={type.id}>{type.name}</label>
                </div>
              );
            })}
          </div>
          {errors.types && (
            <p className={errors.types && style.danger}>{errors.types}</p>
          )}
        </div>
        <div>
          <button
            className={style.btns}
            style={{
              backgroundColor: colorType,
            }}
            type="submit"
            disabled={!(Object.keys(errors).length === 0 && form.name !== "")}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};
export default Form;
