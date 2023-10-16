import {
  POST_POKEMON,
  PUT_POKEMON,
  DEL_POKEMON,
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
} from "./action-types";

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON_BY_ID: //lo llamo desde card para ver el detail
      return { ...state, pokemonDetail: action.payload };

    case GET_POKEMON_BY_NAME: {
      // busca si lo tengo en el estado
      if (!state.pokemons.find(action.payload.id))
        return {
          ...state,
          pokemonDetail: action.payload,
          pokemons: [...state.pokemons, action.payload],
        };
      else return { ...state, pokemonDetail: action.payload };
    }

    case POST_POKEMON:
      return {
        ...state,
        pokemonDetail: action.payload,
        pokemons: [...state.pokemons, action.payload],
      };

    case PUT_POKEMON: {
      //saco el que actualizamos
      const filtered = state.pokemons.filter(
        (pokemon) => pokemon.id === action.payload.id
      );
      return {
        ...state,
        pokemonDetail: action.payload,
        pokemons: [...filtered, action.payload],
      };
    }

    case DEL_POKEMON: {
      //saco el que borramos
      const filtered = state.pokemons.filter(
        (pokemon) => pokemon.id === action.payload.id
      );
      return {
        ...state,
        pokemonDetail: {},
        pokemons: [...filtered],
      };
    }

    case GET_TYPES:
      return { ...state, types: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
