import React from 'react'
import { Link } from 'react-router-dom'

import slowpoke from '../assets/slowpoke.svg'
import questionMark from '../assets/question_mark.svg'

function SlowPokeErrorCard({ errorMessage }){



  return (
    <div className="message default_box_style float_up">
      <h2>{errorMessage}</h2>
      <div className="slowpoke">
        <img className="question" src={questionMark} alt="question mark" />
        <img className="main" src={slowpoke} alt="confused slowpoke" />
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
  )
}


export default SlowPokeErrorCard
