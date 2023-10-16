export function validateNewPokemon(pokemonData) {
  //   // const regexletrasynumeros = new RegExp(/^(?:.*\d){1}/);
  //   // const regexCaracteresInvalidos = new RegExp(/^(?:.*?[#?!@$ %^&*-])/);
  const regexImage = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif|svg))/);
  const errors = {};
  if (pokemonData.name === "") errors.name = "Enter a name";
  if (pokemonData.name.length > 20)
    errors.name = "Name cannot be more than 20 characters";

  if (!regexImage.test(pokemonData.image))
    errors.image = "The image url you are trying to place is not valid";

  if (pokemonData.hp === "" || +pokemonData.hp > 150 || +pokemonData.hp < 1)
    errors.hp = "The value must be between 1 and 150 of Life";

  if (
    pokemonData.attack === "" ||
    pokemonData.attack > 150 ||
    pokemonData.attack < 1
  )
    errors.attack = "The value must be between 1 and 150 attack";

  if (
    pokemonData.defense === "" ||
    +pokemonData.defense > 150 ||
    +pokemonData.defense < 1
  )
    errors.defense = "The value must be between 1 and 150 defense";

  if (
    pokemonData.height === "" ||
    +pokemonData.height > 150 ||
    +pokemonData.height < 1
  )
    errors.height = "The value must be between 1 and 150 height";

  if (
    pokemonData.weight === "" ||
    +pokemonData.weight > 150 ||
    +pokemonData.weight < 1
  )
    errors.weight = "The value must be between 1 and 150 weight";

  if (
    pokemonData.speed === "" ||
    +pokemonData.speed > 150 ||
    +pokemonData.speed < 1
  )
    errors.speed = "The value must be between 1 and 150 speed";

  if (pokemonData.types.length < 1)
    errors.types = "Select at least one type";

  return errors;
}
