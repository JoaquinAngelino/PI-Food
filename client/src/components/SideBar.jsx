import React from 'react';
import style from '../styles/SideBar.module.css'
import logo from '../styles/LOGO_MFA.png'
import { useDispatch } from 'react-redux';
import { filterByDiet } from '../redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlphabeticOrder from './AlphabeticOrder';
import ScoreOrder from './ScoreOrder'



export default function SideBar() {

  const [activeFilter, setActiveFilter] = useState('none')

  const dispatch = useDispatch()
  const handleFilter = (filter) => {
    filter === activeFilter ? setActiveFilter('none') : setActiveFilter(filter)
    dispatch(filterByDiet(filter))
  }



  return (
    <div className={style.SideBarcontainer}>
      <Link to="/home">
        <img src={logo} className={style.imgStyle} alt="logo" />
      </Link>
      <AlphabeticOrder />
      <ScoreOrder />
      <h2 className={style.filterTitle}>Filters</h2>
      <div className={style.filterUl}>
        <h3>Active filter: {activeFilter}</h3>
        <ul>
          <li className={style.filterList} onClick={() => handleFilter("gluten free")}>Gluten free</li>
          <li className={style.filterList} onClick={() => handleFilter("dairy free")}>Dairy free</li>
          <li className={style.filterList} onClick={() => handleFilter("ketogenic")}>Ketogenic</li>
          <li className={style.filterList} onClick={() => handleFilter("paleolithic")}>Paleolithic</li>
          <li className={style.filterList} onClick={() => handleFilter("primal")}>Primal</li>
          <li className={style.filterList} onClick={() => handleFilter("whole 30")}>Whole 30</li>
          <li className={style.filterList} onClick={() => handleFilter("pescarian")}>Pescarian</li>
          <li className={style.filterList} onClick={() => handleFilter("lacto ovo vegetarian")}>Lacto ovo vegetarian</li>
          <li className={style.filterList} onClick={() => handleFilter("vegan")}>Vegan</li>
        </ul>
      </div>
      <div>
        <Link to='/form'>
          <h2>Create your own recipe</h2>
        </Link>
      </div>
    </div>
  )
};