// SearchBar.jsx
import React, { useState } from "react";
import style from "./SearchBar.module.css";

const SearchBar = ({
  handleClickSearch,
  handleChangeSearch,
  handleOrder,
  searchTerm
}) => {
  // let descOrderStyle = "style.active";
  // let ascOrderStyle = "style.orderButton";

  const handleOrderChange = (event) => {
    const orderTerm = event.target.name;
    handleOrder(orderTerm);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    handleChangeSearch(searchTerm);
  };

  return (
    <div className={style.searchBar}>
      <div className={style.searchPanel}>
        <input
          type="search"
          placeholder="Search by name..."
          onChange={handleSearchChange}
          className={style.searchInput}
          value={searchTerm}
        />
        <button onClick={handleClickSearch} className={style.searchButton}>
          🔎
        </button>
      </div>
      <div className={style.orderPanel}>
        <button
          name="D"
          onClick={handleOrderChange}
          className={style.orderButton}
        >
          ▲
        </button>
        <button
          name="A"
          onClick={handleOrderChange}
          className={style.orderButton}
        >
          ▼
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

{
  /* ⬇️⬆️🔼🔽⏫⏬⇊⇈⇧⇩ */
}
