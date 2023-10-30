import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import style from "./FooterBar.module.css";

const Footer = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const appStatus = useSelector((state) => state.messageFooter.appStatus);
  // const messages = useSelector((state) => state.messageFooter.messages);

  const totalPokemonsState = useSelector(
    (state) => state.pokemon.pokemons.length
  );
  const totalPokemonsAPI = useSelector(
    (state) => state.pokemon.pagination.totalPokemonsAPI
  );
  const totalPokemonsDB = useSelector(
    (state) => state.pokemon.pagination.totalPokemonsDB
  );

  const totalPokemonsFilter = useSelector(
    (state) => state.pokemon.filteredPokemons.length
  );
  // const [poksState, setpoksState] = useState(0);
  const [poksFiltered, setPoksFiltered] = useState(0);

  const playErrorSound = () => {
    const audio = new Audio("system:alert");
    audio.play();
  };

  const renderMessage = (message, index) => {
    if (message.owner === currentPage && message.visible === true)
      return (
        <div key={index} className={style.footer_section}>
          <p className={getMessageClass(message.level)}>
            {message.icon} {message.description}: {message.value}
          </p>
        </div>
      );
  };

  //no puedo acualizar el estado con los valores del registro, por eso lo hago a mano
  //pero no corresponde al componente footer
  // const updatePokemonsValues = () => {
  //   if (messages.length > 0) {
  //     setpoksDB(messages[1].value); //db
  //     setpoksState(messages[2].value); //estado
  //     setPoksFiltered(messages[3].value); //filtrado
  //   }
  // };

  // useEffect(() => {
  //   setReduxDescription(appStatus.description);
  //   setReduxStatus(appStatus.status);
  //   // updatePokemonsValues();
  //   if (appStatus.status === 3) {
  //     playErrorSound();
  //   }
  // }, [
  //   appStatus.status,
  //   appStatus.description,
  // ]);

  return (
    <footer className={style.footer}>
      {/* <div className={style.footer_nameSection}>
        <p>Pokemon APP Status</p>
      </div> */}
      <div className={style.poksStatus}>
        {/* <span> Pokemons status: </span> */}
        <div className={style.footer_nameSection}>Pokemon SPA Status</div>
        <div className={style.footer_section}>
          <span>⚙️ API: {totalPokemonsAPI}</span>
        </div>
        <div className={style.footer_section}>
          <span>⚙️ DB: {totalPokemonsDB}</span>
        </div>
        <div className={style.footer_section}>
          <span>⚙️ State: {totalPokemonsState}</span>
        </div>
        <div className={style.footer_section}>
          <span>⚙️ Filter: {totalPokemonsFilter}</span>
        </div>
        <div className={style.footer_statusSection}>
          <p className={getStatusClass(appStatus.status)}>
            {appStatus.description
              ? appStatus.description.length < 35
                ? appStatus.description
                : appStatus.description.substring(0, 35) + "..."
              : ""}
          </p>
        </div>
      </div>
      {/* {messages.length > 0 && messages.map(renderMessage)} */}
      {/* <div className={style.footer_statusSection}>
          <p className={getStatusClass(reduxStatus)}>
            {reduxDescription
              ? reduxDescription.length < 25
                ? reduxDescription
                : reduxDescription.substring(1, 25) + "..."
              : ""}
          </p>
        </div> */}
    </footer>
  );
};

export default Footer;

const getStatusClass = (status) => {
  if (status === 3) {
    return style.highlight;
  } else if (status === 2) {
    return style.inProgress;
  } else {
    return style.done;
  }
};

const getMessageClass = (level) => {
  if (level === 3) {
    return style.highlight;
  } else if (level === 2) {
    return style.warning;
  } else {
    return null;
  }
};
//   { id: 3, description: "panel 3", value: 1, icon: "\uD83D\uDCBD", level: 1 },
//   { id: 4, description: "panel 4", value: 1, icon: "\uD83D\uDCBB", level: 3 },
// ];
// level: 1 normal, 2 warning, 3 danger];
