import { actionTypes } from "../action-types";

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  lastPokemonFromAPI: [],
  types: [],
  pagination: {
    totalPokemonsDB: 0,
    totalPokemonsAPI: 0,
    currentPageNumber: 0,
    currentPageNumberAPI: 1,
    pokemonsPerPage: 12, //la cantidad de pokemones por pagina, tanto de la bdd como api quedan fijos
    pokemonsPerPageAPI: 50, // despues veo si llego a crear un lugar para que el usuario pueda modificarlo
  },
};

const pokemon = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POKEMONS: {
      const { totalPokemonsDB, totalPokemonsAPI } = action.payload;
      const currentPageNumberAPI = state.pagination.currentPageNumberAPI + 1;
      const newPokemons = state.pokemons;
      newPokemons.push(...action.payload.pokemons);
      newPokemons.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        pokemons: newPokemons,
        pagination: {
          ...state.pagination,
          currentPageNumberAPI,
          totalPokemonsDB,
          totalPokemonsAPI,
        },
      };
    }

    case actionTypes.GET_POKEMONS_FROM_API: {
      const pokemons = state.pokemons;
      const newAPIPokemons = action.payload.pokemons;
      // saco los repetidos
      const uniquePokemons = [
        ...pokemons,
        ...newAPIPokemons.filter(
          (newAPIPokemons) =>
            !pokemons.find((pokemons) => pokemons.id === newAPIPokemons.id)
        ),
      ];
      newAPIPokemons.push(...action.payload.pokemons);
      newAPIPokemons.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        pokemons: uniquePokemons,
        lastPokemonFromAPI: [...action.payload.pokemons],
      };
    }

    case actionTypes.GET_POKEMON_BY_ID: //lo llamo desde card para ver el detail, por lo tanto seguro esta en el estado
      return { ...state, pokemonDetail: action.payload };

    case actionTypes.GET_POKEMON_BY_NAME: {
      // busca si lo tengo en el estado, si no esta, lo agrego
      const foundPokemon = state.pokemons.find(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (!foundPokemon) {
        return {
          ...state,
          pokemonDetail: action.payload,
          pokemons: [...state.pokemons, action.payload],
        };
      } else {
        return {
          ...state,
          pokemonDetail: action.payload,
          pagination: {
            ...state.pagination,
            totalPokemonsDB: state.pagination.totalPokemonsDB + 1,
          },
        };
      }
    }
    case actionTypes.POST_POKEMON:
      return {
        ...state,
        pokemonDetail: action.payload,
        pokemons: [...state.pokemons, action.payload],
        pagination: {
          ...state.pagination,
          totalPokemonsDB: state.pagination.totalPokemonsDB + 1,
        },
      };

    case actionTypes.PUT_POKEMON: {
      //saco del estado el pokemon que se quiere actualizar, y lo agrego actualizado
      const filteredPokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
      filteredPokemons.sort((a, b) => a.name.localeCompare(b.name)); //ordeno por si modificaron el nombre
      return {
        ...state,
        pokemonDetail: action.payload,
        pokemons: [...filteredPokemons, action.payload],
      };
    }

    case actionTypes.DEL_POKEMON: {
      //saco el que borramos, seguro esta en el estado
      const filteredPokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      return {
        ...state,
        pokemonDetail: {},
        pokemons: [...filteredPokemons],
        pagination: {
          ...state.pagination,
          totalPokemonsDB: state.pagination.totalPokemonsDB - 1,
        },
      };
    }
    case actionTypes.CLOSE_POKEMON: {
      //saco el que borramos, seguro esta en el estado
      const filteredPokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      return {
        ...state,
        pokemons: [...filteredPokemons],
      };
    }
    case actionTypes.POST_POKEMON_FROM_API: {
      //busco el poke con el numrero de API par sacarlo
      //agrego el nuevo poke guardado en la bdd
      const filteredPokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload.idAPI
      );
      filteredPokemons.push(action.payload.pokemons);
      filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        pokemons: filteredPokemons,
      };
    }
    case actionTypes.SET_USER_PAGINATION_DATA: {
      const { pageNumber, pokemonsPerPage } = action.payload;
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber, pokemonsPerPage },
      };
    }
    case actionTypes.SET_PAGINATION_DATA: {
      const { pageNumber, pageNumberAPI, pokemonsPerPage, pokemonsPerPageAPI } =
        action.payload;
      const paginationData = {
        pageNumber,
        pageNumberAPI,
        pokemonsPerPage,
        pokemonsPerPageAPI,
      };
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber, pokemonsPerPage },
      };
    }

    case actionTypes.GET_TYPES:
      return { ...state, types: action.payload };

    default:
      return { ...state };
  }
};

export default pokemon;
