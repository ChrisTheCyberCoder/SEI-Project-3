import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleItem } from '../lib/api'

function PokeShow() {
  const { id } = useParams()
  const [ hasError, setHasError ] = React.useState(false)
  const [ item, setItems ] = React.useState(null)
  
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await getSingleItem(id)
        setItems(data)
      } catch (err) {
        setHasError(true)
        console.log(err)
      }
    }
    getData()
  },[id])

  if (id) console.log('id',id)

  if (item) {
    console.log('item',item.avgRating)
  } else {
    console.log('no items')
  }

  function itemRating(n){
    console.log('n',n)
    const rating = []
    for (let i = 0; i < n; i++) rating.push('star') 
    console.log('test',rating)
    return rating
  }


  
  return (
    <div className="page_wrapper">
      { item ?
        <div className="product_wrapper">
          <img className= "product_image" src={item.image} alt={item.name} />
          <div className="product_info">
            <div className="rating">
              rating {itemRating(item.avgRating).map((star)=>{
                return (
                  <img key={star} src="../assets/poke_dollar.svg" alt="pokedollar sign" />
                )
              })}
            </div>
            <p>{item.name}</p>
            <p><img src="../assets/poke_dollar.svg" alt="pokedollar sign" />price {item.price}</p>
            <p>description {item.description}</p>
            <p>stock {item.stock}</p>
            
          </div>
        </div>

        :
        hasError ? 
          <img src="../assets/pika_anim.gif" alt="loading" />
          :
          <h1>error</h1>
      }
    </div>
    
  )
}

export default PokeShow