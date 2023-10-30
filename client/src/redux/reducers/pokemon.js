import { actionTypes } from "../action-types";

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  filteredPokemons: [],
  filter: {}, //filterByName: "", filterByOrigin: ""
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
        filteredPokemons: newPokemons,
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
            !pokemons.find((pokemons) => pokemons.idAPI === newAPIPokemons.id)
        ),
      ];
      newAPIPokemons.push(...action.payload.pokemons);
      newAPIPokemons.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        pokemons: uniquePokemons,
        filteredPokemons: [...action.payload.pokemons],
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
          filteredPokemons: action.payload,
          pokemons: [...state.pokemons, ...action.payload],
        };
      } else {
        return {
          ...state,
          pokemonDetail: action.payload,
        };
      }
    }

    case actionTypes.POST_POKEMON:
      return {
        ...state,
        pokemonDetail: action.payload.newPokemon[0],
        pokemons: [...action.payload.newPokemon, ...state.pokemons],
        filteredPokemons: [...action.payload.newPokemon, ...state.pokemons],
        pagination: {
          ...state.pagination,
          totalPokemonsDB: state.pagination.totalPokemonsDB + 1,
        },
      };

    case actionTypes.PUT_POKEMON: {
      const updatedPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );

      if (updatedPokemonIndex !== -1) {
        state.pokemons[updatedPokemonIndex] = action.payload;
      }
      return {
        ...state,
        pokemonDetail: action.payload,
        // pokemons: [...filtered],
      };
    }

    case actionTypes.DEL_POKEMON: {
      //saco el que borramos, seguro esta en el estado
      const filtered = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      return {
        ...state,
        pokemonDetail: {},
        pokemons: [...filtered],
        filteredPokemons: [...filtered],
        pagination: {
          ...state.pagination,
          totalPokemonsDB: state.pagination.totalPokemonsDB - 1,
        },
      };
    }

    case actionTypes.CLOSE_POKEMON: {
      //saco el que borramos, seguro esta en el estado
      const filtered = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      return {
        ...state,
        pokemons: [...filtered],
        filteredPokemons: [...filtered],
      };
    }

    case actionTypes.CLEAR_POKEMON: {
      return {
        ...state,
        pokemonDetail: {},
      };
    }

    case actionTypes.POST_POKEMON_FROM_API: {
      //busco el poke con el numrero de API par sacarlo
      //agrego el nuevo poke guardado en la bdd
      const updatedPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );

      if (updatedPokemonIndex !== -1) {
        state.pokemons[updatedPokemonIndex] = action.payload.pokemons;
      }
      // const filtered = state.pokemons.filter(
      //   (pokemon) => pokemon.id !== action.payload.idAPI
      // );
      // filtered.push(action.payload.pokemons);
      // filtered.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        // pokemons: [...filtered],
        filteredPokemons: [...state.pokemons],
        pokemonDetail: action.payload.pokemons,
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

    case actionTypes.APPLY_FILTERS: {
      let filtros = { ...state.filter };
      const filter = action.payload.filter;
      const value = action.payload.value;
      if (value !== "all") filtros[filter] = value;
      else delete filtros[filter]; //borro el filtro

      let filteredPoks = state.pokemons;

      if (filtros.filterByName) {
        filteredPoks = filteredPoks.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(filtros.filterByName.toLowerCase())
        );
      }

      if (filtros.filterByOrigin) {
        switch (filtros.filterByOrigin) {
          case "bdd": {
            filteredPoks = filteredPoks.filter(
              (pokemon) => pokemon.created && !pokemon.idAPI
            );
            break;
          }
          case "api": {
            filteredPoks = filteredPoks.filter((pokemon) => !pokemon.created);
            break;
          }
          case "copy": {
            filteredPoks = filteredPoks.filter(
              (pokemon) => pokemon.created && pokemon.idAPI
            );
            break;
          }
        }
      }

      if (filtros.filterByType) {
        filteredPoks = filteredPoks.filter((pokemon) =>
          pokemon.types.includes(filtros.filterByType)
        );
      }

      if (filtros.orderByName) {
        if (filtros.orderByName === "D")
          filteredPoks.sort((a, b) => a.name.localeCompare(b.name));
        else filteredPoks.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filter: filtros,
        filteredPokemons: [...filteredPoks],
      };
    }

    case actionTypes.APPLY_MULTIPLE_FILTERS: {
      let filtros = { ...state.filter };
      const { filterByX, filterByXoperator, filterByXvalue } = action.payload;

      filtros["filterBy" + filterByX] =
        filterByXoperator + " " + filterByXvalue;

      let filteredPoks = state.pokemons;
      const strFunction =
        "(pokemon) => pokemon." +
        filterByX +
        " " +
        filterByXoperator +
        " " +
        filterByXvalue;

      // const newFilter = new Function(strFunction);

      filteredPoks = filteredPoks.filter(eval(strFunction));

      return {
        ...state,
        filter: filtros,
        filteredPokemons: [...filteredPoks],
      };
    }

    case actionTypes.CLEAR_FILTERS: {
      return {
        ...state,
        filter: {},
        filteredPokemons: [...state.pokemons],
      };
    }

    case actionTypes.GET_TYPES:
      return { ...state, types: action.payload };

    default:
      return { ...state };
  }
};

export default pokemon;
