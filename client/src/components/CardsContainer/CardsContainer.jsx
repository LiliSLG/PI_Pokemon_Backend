import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./CardsContainer.module.css";
import { getPokemons } from "../../redux/actions";
import { Card } from "../";
import { PaginateBar } from "../bars";
import {
  handleSetFooterAppStatus,
  handleUpdateFooterMessage,
} from "../../handlers/handleFooterMessages";

const CardsContainer = (props) => {
  const { cards } = props;

  const appStatus = useSelector((state) => state.messageFooter.appStatus);
  const cardsPerPage = useSelector(
    (state) => state.pokemon.pagination.pokemonsPerPage
  ); //front
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(
  //   Math.ceil(cards.length / cardsPerPage)
  // );

  // Calculate the range of cards to display in the front
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    setCurrentPage(1);
  }, [appStatus]);

  return (
    <div>
      <div>
        <PaginateBar
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
          cardsTotal={cards.length}
          handleOriginPaginate={handlePaginate}
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
