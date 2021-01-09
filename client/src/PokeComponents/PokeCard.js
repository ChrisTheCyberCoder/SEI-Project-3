import React from 'react'
import { Link } from 'react-router-dom'

function PokeCard({  _id, name, price, image, stock }) {
  return (
    <div className="">
      <Link to={`/items/${_id}`}>
        <div className="">
          <figure className="">
            <img src={image} alt={name}/>
          </figure>
        </div>
        <div>
          <div>PokezonBasics</div>
        </div>
        <div className="">
          <div className="">
            <div className="">{name}</div>
          </div>
          <div className="">
            <div className="">{price}</div>
          </div>
          <div>
            <div> { stock <= 3 ? 'Only ' + stock + ' left in stock' : '' }</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PokeCard
