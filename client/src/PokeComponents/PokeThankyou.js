import React from 'react'
import { Link } from 'react-router-dom'

import Eevee from '../PokeComponents/Eevee'

function PokeThankyou() {
  


  return (
    <section className="page_wrapper">
      <div className="message default_box_style float_up">
        <h2>Thank you for your order!</h2>

        <div className="eevee_thankyou_wrapper">
          <Eevee/>
        </div>

        <div className="button_wrapper"> 
          <Link to={'/'}>
            <button>
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
              Home
            </button> 
          </Link>
        </div>  
      </div>  
    </section>
  )
}

export default PokeThankyou