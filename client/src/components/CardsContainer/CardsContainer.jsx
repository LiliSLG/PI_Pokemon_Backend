import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./CardsContainer.module.css";
import { getPokemons } from "../../redux/actions";
import { Card } from "../";
import { FilterBar, SearchBar, PaginateBar } from "../bars";
import {
  handleSetFooterAppStatus,
  handleUpdateFooterMessage,
} from "../../handlers/handleFooterMessages";

const CardsContainer = () => {
  const dispatch = useDispatch();

  const currentPageNumberAPI = useSelector(
    (state) => state.pokemon.pagination.currentPageNumberAPI
  ); //front
  const cardsPerPage = useSelector(
    (state) => state.pokemon.pagination.pokemonsPerPage
  ); //front
  const totalPokemonsAPI = useSelector(
    (state) => state.pokemon.pagination.totalPokemonsAPI
  );
  const totalPokemonsDB = useSelector(
    (state) => state.pokemon.pagination.totalPokemonsDB
  );

  const pokemons = useSelector((state) => state.pokemon.pokemons);
  // const totalPokemons = useSelector(
  //   (state) =>
  //     state.pokemon.pagination.totalPokemonsDB +
  //     state.pokemon.pagination.totalPokemonsAPI
  // );
  // const types = useSelector((state) => state.types.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(pokemons.length / cardsPerPage)
  );

  // Calculate the range of cards to display in the front
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = pokemons.slice(indexOfFirstCard, indexOfLastCard);

  const handlePaginate = (pageNumber) => {
    if (pageNumber > totalPages) {
      //lamo a la api para traer mas poquemones
      //falla porque agrega al final
      const posApi = pageNumber * cardsPerPage;
      dispatch(getPokemons(posApi, cardsPerPage)).then(
        setTotalPages(Math.ceil(pokemons.length / cardsPerPage))
      );
    }
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchTerm) => {
    // Handle search logic here
    console.log("Search term:", searchTerm);
  };

  const handleFilterChange = (selectedValue) => {
    // Handle filter change logic here
    console.log("Selected filter:", selectedValue);
  };

  const filterOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const filterOrigenOptions = [
    { value: "bdd", label: "Base de datos" },
    { value: "api", label: "API" },
    { value: "all", label: "All Pokemons" },
  ];

  useEffect(() => {
    if (pokemons.length > 0) {
      handleSetFooterAppStatus(dispatch, "READY", 1);
    }
  }, []);

  useEffect(() => {
    handleUpdateFooterMessage(dispatch, "ST_P", pokemons.length, 1, true);
    if (currentCards.length === 0 && pokemons.length > 0) {
      const newPage = Math.ceil(pokemons.length / cardsPerPage);
      setCurrentPage(newPage);
    }
  }, [currentCards, pokemons, cardsPerPage]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.navsContainer}>
          <div className={style.searchContainer}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className={style.filtersContainer}>
            <FilterBar
              key="origen"
              tittleOption="Origin"
              options={filterOrigenOptions}
              onFilterChange={handleFilterChange}
            />
            <FilterBar
              key="f2"
              tittleOption="Otro"
              options={filterOptions}
              onFilterChange={handleFilterChange}
            />
            <FilterBar
              key="f2"
              tittleOption="Type"
              options={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <div className={style.buttonContainer}>
          <Link to="/create">
            <button className={style.createButton}>New Pok</button>
          </Link>
        </div>
      </div>
      <div>
        <PaginateBar
          cardsPerPage={cardsPerPage}
          cardsTotal={totalPokemonsAPI + totalPokemonsDB}
          paginated={handlePaginate}
        />
      </div>
      <div className={style.card_container}>
        {currentCards.map((card) => (
          <Card key={card.id} pokemon={card} />
        ))}
      </div>
    </div>
  );
};
export default CardsContainer;
