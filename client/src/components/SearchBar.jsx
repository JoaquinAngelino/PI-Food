import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipe } from '../redux/actions';
import style from '../styles/SearchBar.module.css'


export default function SearchBar() {

  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchRecipe(value))
  }

  return (
    <div className={style.SearchBarContainer}>
      <input
        type="text"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={style.btnClass} type="submit" onClick={handleSubmit}>Search</button>
    </div>
  )
};