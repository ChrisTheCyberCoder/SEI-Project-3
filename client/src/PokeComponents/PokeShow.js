import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleItem, getItems } from '../lib/api'

function PokeShow() {
  const { id } = useParams()
  const [ hasError, setHasError ] = React.useState(false)
  const [ item, setItem] = React.useState(null)
  const [ items, setItems ] = React.useState(null)
  const [ itemQty, setItemQty ] = React.useState(null)
  let starId = 0
  
  //* get single item
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await getSingleItem(id)
        setItem(data)
      } catch (err) {
        setHasError(true)
        // console.log(err)
      }
    }
    getData()
  },[id])
 
  //* get all items
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
  
  const filteredItems = []
  const filterItems = (items)=> {
    if (!item) return
    return items.filter(ele => {
      return ele.category === item.category
    })
  }
  if (items) {
    if (!item) return null
    const limit = filterItems(items).length < 4 ? filterItems(items).length : 4
    for (let i = 0; i < limit; i++){
      filteredItems.push(filterItems(items)[i])
    }
  }

  // console.log(filteredItems)
  // if (id) console.log('id',id)

  function addToBasket(e){
    e.preventDefault()
    if (itemQty < 1) return
    console.log(`add qty of ${itemQty} item id ${id} to the basket`)
  }

  function itemRating(n){
    // console.log('n',n)
    const rating = []
    for (let a = 0; a < n; a++) rating.push('star') 
    for (let b = 0; b < (5 - n); b++) rating.push('blank') 
    // console.log('test',rating)
    return rating
  }

  function mapStars(rating){
    const staryus = rating.map((ele)=>{
      starId ++
      return (
        ele === 'star' ?
          <img className="staryu" key={starId} src="../assets/staryu.svg" alt="staryu" />
          :
          <img key={starId} src="../assets/blank_star.svg" alt="blank star" />
      )
    })
    return staryus
  }
  
  return (
    <div className="page_wrapper_column">
      { item ?
        <>
          <div className="product_wrapper">
            <img className= "product_image" src={item.image} alt={item.name} />
            <div className="product_info">
              <div className="rating">
                {mapStars(itemRating(item.avgRating))}
              </div>
              <p>{item.name}</p>
              <p><img src="../assets/poke_dollar.svg" alt="pokedollar sign" />price {item.price}</p>
              <p>description {item.description}</p>
              <button>
                <img src="../assets/speech_bubble.svg" alt="speech bubble" /> comment
              </button>
            </div>
            <form className="buy_wrapper" onSubmit={addToBasket}>
              {item.stock ?
                <p>{item.stock} left in stock</p>
                :
                <p>sorry, out of stock</p>
              }
              <input type="number" name="qty" min="0" max={item.stock} onChange={(e)=>setItemQty(e.target.value)}/>
              <button>
                <img src="../assets/pokeball_grey.svg" alt="pokeball" /> add to basket
              </button>
            </form> 
          </div>

          <div className="similar_items_wrapper">
            similar items
            {item ?
              <div className="inner_wrapper">
                {filteredItems.map(item=>{
                  return (
                    <>
                      <Link to={`/pokeshow/${item._id}`}>
                        <div className="similar_items" key={item.name}>
                          {item.name}
                          <img src={item.image} alt={item.name} />
                          <div>
                            <img src="../assets/poke_dollar.svg" alt="pokedollar sign" />
                            {item.price}
                          </div>
                        </div>  
                      </Link>
                    </>
                  )
                })}
              </div>
              
              :
              <p>loading</p>
            }

          </div>  

          <div className="comments_wrapper">
            comments

          </div>  
        </>
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