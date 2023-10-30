import React from "react";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>About this application</h2>
      <p className={style.text}>
        Welcome to our Pokémon SPA! This application allows you to explore and
        discover information about various Pokémon.
      </p>
      <p className={style.text}>
        This Single Page Application was created using the following tecnologies: <b>React</b>, <b>JavaScript</b>,{" "}
        <b>CSS</b>, <b>Redux</b>, <b>Node.js</b>, <b>Express</b>,{" "}
        <b>Sequelize</b> y <b>Postgres</b>.
      </p>
      <p className={style.text}>
        Etapa de proyecto individual del bootcamp HENRY. Con el objetivo de
        poner en práctica , afirmar y conectar los conceptos aprendidos en la
        carrera.
      </p>
    </div>
  );
};

export default About;
