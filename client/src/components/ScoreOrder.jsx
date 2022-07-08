import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderByHealthScore } from '../redux/actions';
import logo from '../styles/sort-asc.png'
import style from '../styles/Sort.module.css'

export default function ScoreOrder() {

  const [order, setOrder] = useState('asc')
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(orderByHealthScore(order))
    if(order === 'asc'){
      setOrder('des')
    }else{
      setOrder('asc')
    }
  }

  return (
    <div className={style.sortDiv} onClick={() => handleClick()}>
      <img className={style.sortSvg} src={logo} alt="logo" />
      <p className={style.sortBtn}>HealthScore: {order}</p>
    </div>
  )
}