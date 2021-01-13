import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'


function PokeCard({  _id, name, price, image, stock, avgRating }) {
  


  //* function for displaying the rating
  let starId = null
  
  function itemRating(n){
    const rating = []
    for (let a = 0; a < n; a++) rating.push('star') 
    for (let b = 0; b < (5 - n); b++) rating.push('blank') 
    return rating
  }
 
  function mapStars(rating){
    const staryus = rating.map((ele)=>{
      starId = uuidv4()
      // console.log('id',starId)
      const random = Math.ceil(Math.random() * 50)
      return (
        ele === 'star' ?
          random === 50 ? 
            <img className="staryu" key={starId} src="../../assets/staryu.svg" alt="staryu" />
            :
            <img key={starId} src="../../assets/star.svg" alt="staryu" />
          :
          <img key={starId} src="../../assets/blank_star.svg" alt="blank star" />
      )
    })
    return staryus
  }


  return (
    <Link to={`/pokeshow/${_id}`}>
      <div className="poke_card">
        <img src={image} alt={name}/>
        {/* <div>
          PokezonBasics
        </div> */}
        <div className="">
          <p>{name} <img src="../../assets/poke_dollar.svg" alt="pokedollar sign" />{price}</p>
        </div>
        <div className="rating">
          {mapStars(itemRating(avgRating))}
        </div>

        <div className="">
          
        </div>

        <div> 
          { stock <= 3 ? 'Only ' + stock + ' left in stock' : '' }
        </div>

      </div>
    </Link> 
  )
}

export default PokeCard



