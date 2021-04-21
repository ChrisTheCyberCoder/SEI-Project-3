import React from 'react'
import '../styles/PokeCardHome.scss'
import { getItems } from '../lib/api'


function PokeCardHome({ title, image, price, rating }){
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

  console.log('error', hasError)
  
  if (items) console.log('items',items)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getItems()
        setItems(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$AR{price}</small>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map(() => (
                <p key=""><span>⭐</span></p>
              ))}
          </div>  
        </div>
        <img src={image} alt="" />
        <button>Agregar al Carro</button>            
      </div>
    </>  
  )
}

export default PokeCardHome


