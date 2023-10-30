const pokemonMapFromAPI = (pokemonsFromAPI) =>
//mando los detalles del pokemon para no tener que buscar cuando
//importo el poke a la bdd
  pokemonsFromAPI.map((pokemon) => {
    return {
      id: pokemon.id.toString(),
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.stats[0].base_stat,
      image: pokemon.sprites.other.dream_world.front_default,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      types: pokemon.types.map((t) => ({
        id: t.type.url.split("/")[6],
        name: t.type.name,
      })),
      created: false,
      idAPI: pokemon.id.toString(),
    };
  });

const pokemonMapDetailFromAPI = (pokemonsFromAPI) =>
  pokemonsFromAPI.map((pokemon) => {
    return {
      id: pokemon.id.toString(),
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.stats[0].base_stat,
      image: pokemon.sprites.other.dream_world.front_default,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      types: pokemon.types.map((t) => ({
        id: t.type.url.split("/")[6],
        name: t.type.name,
      })),
      created: false,
      idAPI: pokemon.id.toString(),
    };
  });

const pokemonMapFromDB = (pokemonsFromDB) =>
  pokemonsFromDB.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.hp,
      image: pokemon.image,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      types: pokemon.types?.map((type) => ({ id: type.id, name: type.name })),
      created: true, //ver
      idAPI: pokemon.idAPI,
    };
  });

const pokemonMapDetailFromDB = (pokemonsFromDB) =>
  pokemonsFromDB.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.hp,
      image: pokemon.image,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      types: pokemon.types?.map((type) => ({ id: type.id, name: type.name })),
      created: true, //ver
      idAPI: pokemon.idAPI,
    };
  });

const pokemonMapNames = (pokemonsFromAPI) =>
  pokemonsFromAPI.map((pokemon) => {
    return {
      name: pokemon.name,
    };
  });

module.exports = {
  pokemonMapFromAPI,
  pokemonMapFromDB,
  pokemonMapDetailFromDB,
  pokemonMapDetailFromAPI,
  pokemonMapNames,
};
