import React from "react";
import PropTypes from "prop-types";
import style from "./ProgressBar.module.css";

const ProgressBar = ({ color, total, value }) => {
  const progress = (value / total) * 100;

  return (
    <div className={style.progressBar}>
      <div
        className={style.progressBar__progress}
        style={{ backgroundColor: color, width: `${progress}%` }}
      >
        <span className={style.progressBar__text}>{`${progress.toFixed(0)} `}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
