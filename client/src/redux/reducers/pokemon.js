import { actionTypes } from "../action-types";

const initialState = {
  pokemons: [],
  pokemonDetail: {},
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
      state.pokemons.push(...action.payload.pokemons);//agrego los pokemons que cargo
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
        pagination: {
          ...state.pagination,
          currentPageNumberAPI,
          totalPokemonsDB,
          totalPokemonsAPI,
        },
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
