import React from "react";
import SideBar from './SideBar'
import SearchBar from './SearchBar'
import CtrlForm from "./CtrlForm";
import style from '../styles/FormPage.module.css'

export default function FormPage() {

  return (
    <div className={style.formContainer}>
      <SideBar />
      <SearchBar />
      <div className={style.form}>
        <h1>Create your own recipe.</h1>
        <CtrlForm />
      </div>
    </div>
  )
}