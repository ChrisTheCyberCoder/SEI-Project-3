import React from 'react'

import desk from '../assets/desk.svg'
import leftEar from '../assets/eevee_left_ear.svg'
import rightEar from '../assets/eevee_right_ear.svg'
import face from '../assets/eevee_face.svg'
import body from '../assets/eevee_body.svg'
import tail from '../assets/eevee_tail.svg'


function Eevee(){


  return (
    <div className="eevee_wrapper">

      <div className="eevee">
        <div className="head">
          <img className="left_ear" src={leftEar} alt="eevee left ear" />
          <img className="right_ear" src={rightEar} alt="eevee right ear" />
          <img className="face" src={face} alt="eevee face" />
        </div>  

        <div className="body">
          <img className="tail" src={tail} alt="eevee tail" />
          <img className="main" src={body} alt="eevee body" />
        </div>  
      </div>

      <img className="desk" src={desk} alt="reception desk" /> 

    </div>
  )
}

export default Eevee