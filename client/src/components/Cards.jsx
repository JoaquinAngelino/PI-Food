import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/Cards.module.css'
import Card from './Card';
import Pagination from './Pagination';

export default function Cards() {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)
  const recipes = useSelector(state => state.recipes)

  const idxLastItem = currentPage * postPerPage
  const ixdFirstItem = idxLastItem - postPerPage
  const pageRecipes = recipes.slice(ixdFirstItem, idxLastItem)

  const paginate = (number) => { setCurrentPage(number) }

  return (
    <div>
      <Pagination postPerPage={postPerPage} totalPosts={recipes.length} paginate={paginate} />
      <div className={style.CardsContainer}>
        {pageRecipes.length > 0 && pageRecipes.map(e => <Card
          key={e.id}
          title={e.title}
          healthScore={e.healthScore}
          diets={e.diets}
          image={e.image}
        />)}
      </div>
    </div>
  )

};