import React from "react"
import style from '../styles/LandingPage.module.css'
import { Link } from "react-router-dom"


export default function LandingPage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome to Food App</h1>
      <p className={style.pStyle}>where you can find the recipe you've been searching for</p>
      <Link to={'/home'} style={{ textDecoration: 'none' }}>
        <button className={style.btnClass}>Get in</button>
      </Link>
    </div>

  )
}