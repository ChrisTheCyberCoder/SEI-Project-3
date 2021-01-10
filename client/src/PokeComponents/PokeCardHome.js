import React from 'react'
// import { useStateValue } from './StateProvider'
import '../styles/PokeCardHome.scss'
import { getItems } from '../lib/api'
// import item from '../../../models/item'

// const randomNumsArr = () => {
//   const arr = []
//   while (arr.length < 10){
//     const r = Math.floor(Math.random() * 400) + 1
//     if (arr.indexOf(r) === -1) arr.push(r)
//   }
//   return arr
// }

function PokeCardHome({ title, image, price, rating }){
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)
  console.log(items)
  console.log(hasError)

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



// const [{}, dispatch] = useStateValue()

// const addToBasket = () => {
//   //Add item to basket....
//   dispatch({
//     type: 'ADD_TO_BASKET',
//     item: {
//       id: id,
//       title: title,
//       image: image,
//       price: price,
//       rating: rating
//     }
//   })
// };

