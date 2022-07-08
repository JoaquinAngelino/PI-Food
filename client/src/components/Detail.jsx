import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { searchRecipe } from "../redux/actions";
import style from "../styles/Detail.module.css"
import logo from '../styles/back.png'

export default function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchRecipe(id))
  })
  const [recipe] = useSelector(state => state.recipes)

  let recipeDiets = []
  if (recipe.diets) {
    recipe.diets.forEach(e => {
      recipeDiets.push(<li>{e.name} </li>)
    });
  }
  let recipeInstructions = []
  if (recipe.instructions) {
    recipe.instructions.forEach((e, idx) => {
      recipeInstructions.push(<li className={style.instructions}>{idx + 1 + ". " + e.step}</li>)
    })
  }

  return (
    <div className={style.detailDiv}>
      <Link to="/home">
        <img className={style.homeBtn} src={logo} alt="GoBack" />
      </Link>
      <h2>{recipe.title}</h2>
      <div>
        <p>Health Score: {recipe.healthScore}</p>
        <p>summary: </p>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <p>Diets: </p>
        <ul>
          {recipeDiets}
        </ul>
        <p>Intructions: </p>
        <ul>
          {recipeInstructions}
        </ul>
      </div>
      {recipe.image && <img src={recipe.image} alt="title" />}
    </div>
  )

}