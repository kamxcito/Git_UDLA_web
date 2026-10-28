import React from 'react'
import logomain from "../../../public/avocado.png"
import "./header.css"

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <img src={logomain} alt="Logo" />
      <p>This is a simple paragraph in the header.</p>
    </header>
  )
}

export default Header