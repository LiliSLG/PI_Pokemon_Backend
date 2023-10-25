import React from "react";
import style from "./FilterBar.module.css";

const FilterBar = ({
  options,
  tittleOption,
  selectedOption,
  onFilterChange,
}) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

  // const tittleOption = options.shift().label;

  return (
    <div className={style.filterBar}>
      {/* <label htmlFor="filter-select">Filter:</label> */}
      <select
        id="filter-select"
        value={selectedOption}
        onChange={handleFilterChange}
        className={style.filterSelect}
      >
        <option value="" disabled selected hidden>
          {"Filter by "+ tittleOption}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
