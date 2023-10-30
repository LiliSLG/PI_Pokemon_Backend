import style from "./PaginateBar.module.css";

const PaginateBar = (props) => {
  const { currentPage, cardsPerPage, cardsTotal, handleOriginPaginate } = props;

  const pageNumbersArray = [];
  const totalPages = Math.ceil(cardsTotal / cardsPerPage);
  let startNumber = 1;
  let endNumber;
  if (totalPages > 0 && currentPage >= 1 && currentPage <= totalPages) {
    if (totalPages < 5) {
      startNumber = 1;
      endNumber = totalPages;
    } else {
      const startNumber =
        currentPage !== totalPages ? Math.max(1, currentPage) : currentPage - 4;
      const endNumber = Math.min(startNumber + 4, totalPages);
    }
    for (let i = startNumber; i <= endNumber; i++) {
      pageNumbersArray.push(i);
    }
  }

  const renderPageButtons = () => {
    return pageNumbersArray.map((index) => {
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

  // Handle navigation to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) handlePaginate(currentPage - 1);
  };

  // Handle navigation to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(cardsTotal / cardsPerPage))
      handlePaginate(currentPage + 1);
  };

  // const searchPagesUp = () => {
  //   const pageNumbersArray = pageNumbers;
  //   const totalPages = Math.ceil(cardsTotal / cardsPerPage);
  //   const lastPageNumber = pageNumbersArray[pageNumbersArray.length - 1];
  //   if (lastPageNumber <= totalPages) {
  //     pageNumbersArray.push(lastPageNumber + 1); //agrego al final
  //     pageNumbersArray.shift(); //saco el primero
  //     setPageNumbers([...pageNumbersArray]);
  //   }
  // };

  // const searchPagesDown = () => {
  //   const pageNumbersArray = pageNumbers;
  //   const firstPageNumber = pageNumbersArray[0];
  //   if (firstPageNumber >= 0) {
  //     pageNumbersArray.unshift(firstPageNumber - 1); //agrego al ppio
  //     pageNumbersArray.pop(); //saco el ultimo
  //     setPageNumbers([...pageNumbersArray]);
  //   }
  // };

  const searchPagesBeginning = () => {
    // setPageNumbers(handlePageNumbers(1));
  };

  const searchPagesEnd = () => {
    // setPageNumbers(handlePageNumbers(Math.ceil(cardsTotal / cardsPerPage)));
  };

  const handlePaginate = (newPage) => {
    handleOriginPaginate(newPage);
  };

  const down = "<";
  const up = ">";

  return (
    <div className={style.paginationBar}>
      <button
        className={style.buttonToGo}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        ⏪
      </button>
      {/* <button
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
      </button> */}

      {renderPageButtons()}

      {/* <button
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
      </button> */}
      <button
        className={style.buttonToGo}
        onClick={goToNextPage}
        disabled={currentPage === Math.ceil(cardsTotal / cardsPerPage)}
      >
        ⏩
      </button>
    </div>
  );
};
export default PaginateBar;
