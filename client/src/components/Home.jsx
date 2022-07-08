import React from 'react';
import style from '../styles/Home.module.css'
import SideBar from './SideBar';
import SearchBar from './SearchBar';
import Cards from './Cards';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipe } from '../redux/actions';


export default function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(searchRecipe())
  })

  return (
    <div className={style.HomeContainer}>
      <SearchBar/>
      <SideBar/>
      <Cards/>
    </div>
  )
};