/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getSingleItem, getItems, headers } from '../lib/api'
import { deleteComment } from '../lib/api'
import { getPayload } from '../lib/auth'
import { itemRating } from '../lib/itemRating'
import { v4 as uuidv4 } from 'uuid'

import star from '../assets/star.svg' 
import staryu from '../assets/staryu.svg' 
import blankStar from '../assets/blank_star.svg' 

function PokeShow() {
  const history = useHistory()
  const { id } = useParams()
  const [ hasError, setHasError ] = React.useState(false)
  const [ item, setItem] = React.useState(null)
  const [ items, setItems ] = React.useState(null)
  const [ itemQty, setItemQty ] = React.useState(1)
  const [commentToDelete, setCommentToDelete] = React.useState(null)
  const [itemAlreadyInBasket, setItemAlreadyInBasket] = React.useState(false)

  // const [formdata, setFormData] = React.useState({ // This form is ONLY for basket. 
  //   itemId: `${id}`, 
  //   quantity: `${itemQty}` 
  // })
  
  let starId = 0
  
  //* get single item
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await getSingleItem(id)
        setItem(data)
        console.log(item) //chris added
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
  
  function goToItemPage(id){
    history.push(`/pokeshow/${id}`)
    // window.location.reload()
  }


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

  console.log(filteredItems)
  if (id) console.log('id',id)

  const addToBasket = async e => {
    e.preventDefault()
    const body = {
      quantity: itemQty,
      item: id
    }

    try {
      const response = await axios.post('/api/userprofile/basket', body, headers())
      console.log('the response', response)
    } catch (err) {
      console.log(err)
    }


  }

  function getUserId(){
    const payload = getPayload()
    if (!payload) return false
    console.log( 'userId on pokeshow',payload.sub )
    return payload.sub
  }  
  getUserId()

  //note to self: if you reload page after stopping and starting the server it could lead to error because the id in url has changed. 

  //console.log('this is the form data', formdata) //! Debugging purposes 


  function mapStars(rating){
    const staryus = rating.map((ele)=>{
      starId = uuidv4()
      // console.log('id',starId)
      const random = Math.ceil(Math.random() * 50)
      return (
        ele === 'star' ?
          random === 50 ? 
            <img className="staryu" key={starId} src={staryu} alt="staryu" />
            :
            <img key={starId} src={star} alt="staryu" />
          :
          <img key={starId} src={blankStar} alt="blank star" />
      )
    })
    return staryus
  }


  // if (commentToDelete) { //! Note to self: Leave here, still need to fix one comment bug. THis can be uncommented (alternative)
  //   window.location.reload()
  //   return
  // }

  
  const handleChangeDelete = async event => { //Delete Comments Logic 
    // console.log('delete button triggered')
    // console.log(event.target.value)
    const commentId = event.target.value 
    try {
      await deleteComment(id, commentId)
      setCommentToDelete(event.target.value)
      // window.location.reload() //! Note to self: Leave this here. 
    } catch (err) {
      console.log(err)
    }
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
              
              <label>{item.name}
                <img src="../assets/poke_dollar.svg" alt="pokedollar sign" /> {item.price}
              </label>
              <div className="description">description {item.description}</div>
              <div className="button_wrapper comment">
                <Link to={`/pokecomment/${id}`}>
                  <button>
                    <img src="../assets/speech_bubble.svg" alt="speech bubble" /> Comment
                  </button>
                </Link>
              </div>
            </div>
            <form className="buy_wrapper" onSubmit={addToBasket}>
              {item.stock ?
                <p>{item.stock} left in stock</p>
                :
                <p>sorry, out of stock</p>
              }
              <input type="number" defaultValue="1" name="qty" min="1" max={item.stock} onChange={(e)=>setItemQty(e.target.value)}/>
              <button>
                <img src="../assets/pokeball_grey.svg" alt="pokeball" /> add to basket
              </button>
            </form> 
            { itemAlreadyInBasket ? 
              <div>
                <p>You have already placed the item in the basket</p> 
                <button onClick={()=>setItemAlreadyInBasket(false)}>Ok</button>   {/* need styling here */}
              </div>
              : null }
          </div>

          <div className="similar_items_wrapper">
            <label>
              Similar Items
            </label>  
            {item ?
              <div className="similar_items_inner_wrapper">
                {filteredItems.map(item=>{
                  return (
                    <>
                      <div className="similar_items" 
                        key={item.name}
                        onClick={()=>{ 
                          goToItemPage(item._id)
                        }}>
                        {item.name}
                        <img src={item.image} alt={item.name} />
                        <div>
                          <img src="../assets/poke_dollar.svg" alt="pokedollar sign" />
                          {item.price}
                        </div>
                      </div>  
                    </>
                  )
                })}
              </div>
              
              :
              <p>loading</p>
            }

          </div>  

          <div className="comments_wrapper">
            {!item ? '...Loading' : item.comments.map(comment => 
              <div key={comment._id}>
                {commentToDelete === comment._id ? null : <div>{comment.text}</div>}
                {commentToDelete === comment._id ? null : <div>{comment.rating}</div>}
                {commentToDelete === comment._id ? null : <div>{comment.owner.username}</div>}
                {commentToDelete === comment._id ? null : <button value={comment._id} onClick={handleChangeDelete}>Delete</button>}
              </div>
            )}
          </div>
          
          

            
        </>
        :
        !hasError ? 
          <img src="../assets/pika_anim.gif" alt="loading" />
          :
          <h1>error</h1>
      }
    </div>
    
  )
}

export default PokeShow