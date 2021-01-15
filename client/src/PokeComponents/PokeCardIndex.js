import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { itemRating } from '../lib/itemRating'

import star from '../assets/star.svg' 
import staryu from '../assets/staryu.svg' 
import blankStar from '../assets/blank_star.svg' 
import pokeDollar from '../assets/poke_dollar.svg'

function PokeCard({  _id, name, price, image, stock, avgRating }) {
  


  //* function for displaying the rating
  let starId = null
  
 
  function mapStars(rating){
    const staryus = rating.map((ele)=>{
      starId = uuidv4()
      // console.log('id',starId)
      const random = Math.ceil(Math.random() * 60)
      return (
        ele === 'star' ?
          random === 60 ? 
            <img className="staryu" key={starId} src={staryu} alt="staryu" />
            :
            <img key={starId} src={star} alt="staryu" />
          :
          <img key={starId} src={blankStar} alt="blank star" />
      )
    })
    return staryus
  }


  return (
    <Link to={`/pokeshow/${_id}`}>
      <div className="poke_card">
        <img className="pulse" src={image} alt={name}/>
        <div>
          <p>{name} <img src={pokeDollar} alt="pokedollar sign" />{price}</p>
        </div>
        <div className="rating">
          {mapStars(itemRating(avgRating))}
        </div>
        <div> 
          { stock <= 3 ? 'Only ' + stock + ' left in stock' : '' }
        </div>

      </div>
    </Link> 
  )
}

export default PokeCard



