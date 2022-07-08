import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Card.module.css'

export default function Card({ title, image, healthScore, diets }) {

  let recipeDiets = []
  diets.forEach((e, idx) => {
    recipeDiets.push(<li key={idx} className={style.cardLi}>{e.name} </li>)
  });
  return (
    <Link to={"/detail/" + title}>
      <div className={style.card}>
        <h2>{title}</h2>
        <div className={style.recuadro}>
          <p>Health Score: {healthScore}</p>
          <p className={style.diet}>Diets: </p>
          <ul>
            {recipeDiets}
          </ul>
        </div>
        <img src={image} alt="title" />
      </div>
    </Link>
  )
};