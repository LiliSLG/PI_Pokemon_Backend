// SearchBar.jsx
import React from "react";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={handleSearch}
        className={style.searchInput}
      />
      <button className={style.searchButton}>Search</button>
      <button className={style.searchButton}>Adv. Search</button>
    </div>
  );
};

export default SearchBar;
