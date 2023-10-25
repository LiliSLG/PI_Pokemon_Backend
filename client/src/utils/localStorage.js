const PAGINATION_DATA_KEY = "paginationData";
const POKEMON_DATA_KEY = "pokemonData";
const TYPE_DATA_KEY = "typeData";


export const savePaginationDataToLocalStorage = (data) => {
  localStorage.setItem(PAGINATION_DATA_KEY, JSON.stringify(data));
};

export const loadPaginationDataFromLocalStorage = () => {
  const data = localStorage.getItem(PAGINATION_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const savePokemonsStateToLocalStorage = (pokemons) => {
  // Save the JSON string to the local storage with a key
  localStorage.setItem(POKEMON_DATA_KEY, JSON.stringify(pokemons));
};

export const loadPokemonsStateFromLocalStorage = () => {
  const data = localStorage.getItem(POKEMON_DATA_KEY);
  return data ? JSON.parse(data) : null;
};


export const saveTypesStateToLocalStorage = (types) => {
  // Save the JSON string to the local storage with a key
  localStorage.setItem(TYPE_DATA_KEY, JSON.stringify(types));
};

export const loadTypesStateFromLocalStorage = () => {
  const data = localStorage.getItem(TYPE_DATA_KEY);
  return data ? JSON.parse(data) : null;
};
