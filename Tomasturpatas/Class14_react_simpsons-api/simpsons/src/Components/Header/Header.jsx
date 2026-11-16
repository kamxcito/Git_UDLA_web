import React from 'react'
import "./Header.css"
import { getImageUrl } from '../../config'

const Header = () => {
  return (
    <header>
        <img src={getImageUrl(1)} alt="Homer Simpson" />
        <div id="header-text">
            <h1>Los Simpson</h1>
            <p>«Explorador de APIs hecho con React»</p>
        </div>
        <img src={getImageUrl(3)} alt="Bart Simpson" />
    </header>
  )
}

export default Header
