// import React from "react";
import { useState } from "react";
import style from "./PaginateBar.module.css";

const PaginateAPIBar = (props) => {
  const { cardsPerPage, cardsTotal, handleOriginPaginate } = props;

  // const totalPages = Math.ceil(cardsTotal / cardsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  // useEffect(() => {
  //   setPageNumbers(handlePageNumbers(1));
  // }, []);

  // Handle navigation to previous page
  // const goToPreviousPage = () => {
  //   if (currentPage < pageNumbers[0]) {
  //     //el numero no esta en los botones
  //     setPageNumbers(handlePageNumbers(currentPage));
  //   }
  //   handlePaginate(currentPage - 1);
  // };

  // // Handle navigation to next page
  // const goToNextPage = () => {
  //   if (currentPage > pageNumbers[5]) {
  //     //el numero no esta en los botones
  //     setPageNumbers(handlePageNumbers(currentPage));
  //   }
  //   handlePaginate(currentPage + 1);
  // };

  const searchPagesUp = () => {
    const pageNumbersArray = pageNumbers;
    const totalPages = Math.ceil(cardsTotal / cardsPerPage);
    const lastPageNumber = pageNumbersArray[pageNumbersArray.length - 1];
    if (lastPageNumber <= totalPages) {
      pageNumbersArray.push(lastPageNumber + 1); //agrego al final
      pageNumbersArray.shift(); //saco el primero
      setPageNumbers([...pageNumbersArray]);
    }
  };

  const searchPagesDown = () => {
    const pageNumbersArray = pageNumbers;
    const firstPageNumber = pageNumbersArray[0];
    if (firstPageNumber >= 0) {
      pageNumbersArray.unshift(firstPageNumber - 1); //agrego al ppio
      pageNumbersArray.pop(); //saco el ultimo
      setPageNumbers([...pageNumbersArray]);
    }
  };

  const searchPagesBeginning = () => {
    setPageNumbers(handlePageNumbers(1));
  };

  const searchPagesEnd = () => {
    setPageNumbers(handlePageNumbers(Math.ceil(cardsTotal / cardsPerPage)));
  };

  const handlePaginate = (newPage) => {
    setCurrentPage(newPage);
    handleOriginPaginate(newPage);
  };

  const down = "<";
  const up = ">";

  // useEffect(() => {
  //   if (pageNumbersArray.length === 0) {
  //     handlePageNumbers(1);
  //     setPageNumbers([...pageNumbersArray]);
  //   }
  // }, [pageNumbers]);

  function handlePageNumbers(pageNumber) {
    const pageNumbersArray = [];
    const totalPages = Math.ceil(cardsTotal / cardsPerPage);

    if (totalPages > 0 && pageNumber >= 1 && pageNumber <= totalPages) {
      const startNumber =
        pageNumber !== totalPages ? Math.max(1, pageNumber) : pageNumber - 4;
      const endNumber = Math.min(startNumber + 4, totalPages);

      for (let i = startNumber; i <= endNumber; i++) {
        pageNumbersArray.push(i);
      }
    }

    setPageNumbers(pageNumbersArray);
    //   return pageNumbersArray;
  }

  const renderPageButtons = () => {
    // handlePageNumbers(currentPage);
    return pageNumbers.map((index) => {
      const isActive = currentPage === index;
      const buttonClassName = isActive ? style.active : "";
      return (
        <button
          onClick={() => handlePaginate(index)}
          className={buttonClassName}
        >
          {index}
        </button>
      );
    });
  };

  return (
    <div className={style.paginationBar}>
      <button
        className={style.buttonToGo}
        onClick={handlePaginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ⏪
      </button>
      <button
        className={style.buttonUpDown}
        onClick={searchPagesBeginning}
        // disabled={buttonsValues.button1 === 1}
      >
        {"I" + down}
      </button>
      <button
        className={style.buttonUpDown}
        onClick={searchPagesDown}
        // disabled={buttonsValues.button1 === 1}
      >
        {down}
      </button>

      {renderPageButtons()}

      <button
        className={style.buttonUpDown}
        onClick={searchPagesUp}
        // disabled={buttonsValues.button5 === totalPages}
      >
        {up}
      </button>
      <button
        className={style.buttonUpDown}
        onClick={searchPagesEnd}
        // disabled={buttonsValues.button5 === totalPages}
      >
        {up + "I"}
      </button>
      <button
        className={style.buttonToGo}
        onClick={handlePaginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(cardsTotal / cardsPerPage)}
      >
        ⏩
      </button>
    </div>
  );
};
export default PaginateAPIBar;
