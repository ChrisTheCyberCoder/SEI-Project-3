import React from 'react'
import { Link } from 'react-router-dom'

import marchamp from '../assets/marchamp.svg'

function MarchampSecurity({ message, link, buttonText }){


  return (

    <div className="message default_box_style float_up">
      <h2>{message}</h2>
      <div className="marchamp">
        <img className="main" src={marchamp} alt="marchamp security guard" />
      </div>  
  
      <div className="button_wrapper"> 
        <Link to={link}>
          <button>
            <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
            {buttonText}
          </button> 
        </Link>
      </div>  
    </div> 
  )
}

export default MarchampSecurity

