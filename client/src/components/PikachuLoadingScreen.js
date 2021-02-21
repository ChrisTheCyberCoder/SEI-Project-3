import React from 'react'
import pika from '../assets/pika_anim.gif'


function PikachuLoadingScreen(){


  return (
    <div className="center_box">
      <div className="bar">
        <div className="inside"></div>
      </div>
      <img className="pika" src={pika} alt="pikachu" />
    </div> 
  )
}

export default PikachuLoadingScreen