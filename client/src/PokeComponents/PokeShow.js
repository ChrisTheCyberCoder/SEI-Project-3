/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getSingleItem, getItems, headers } from '../lib/api'
import { deleteComment } from '../lib/api'
import { getPayload } from '../lib/auth'
import { itemRating } from '../lib/itemRating'
import { v4 as uuidv4 } from 'uuid'

import marchamp from '../assets/marchamp.svg'
import PikachuLoadingScreen from './PikachuLoadingScreen'
import SlowPokeErrorCard from './SlowpokeErrorCard'

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
  const [ commentToDelete, setCommentToDelete ] = React.useState(null)
  const [ itemAlreadyInBasket, setItemAlreadyInBasket ] = React.useState(false)
  const [ similarItems, setSimilarItems ] = React.useState([]) 

  const [ unauthorized, setUnauthorized]  = React.useState(false)
  const [ itemInBasket, setItemInBasket] = React.useState(false)
  const [ notLoggedIn, setNotLoggedIn ] = React.useState(false)
  
  let starId = 0
  
  //* get single item
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await getSingleItem(id)
        setItem(data)
        console.log(item) 
      } catch (err) {
        setHasError(true)
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
        setSimilarItems(filterItem(data))

      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [item])
  
  function goToItemPage(id){
    setItemInBasket(false)
    setItemQty(1)
    history.push(`/pokeshow/${id}`)
  }

  const closeWarning = e =>{
    e.target.parentNode.parentNode.classList.remove('float_up')
    e.target.parentNode.parentNode.classList.add('accepted')
    setTimeout(()=>{
      setUnauthorized(false)
    },500)
  }



  function filterItem(array){
    const filteredItems = []
    const filtered = array.filter(ele => {
      return ele.category === item.category && ele.name !== item.name
    })
    for (let i = 0; i < 4; i++){
      filteredItems.push(filtered[i])
    }
    return filteredItems
  }


  function mapSimilarItems(array){
    return array.map(item=>{
      return (
        <div className="similar_items" 
          key={item.name}
          onClick={()=>{ 
            goToItemPage(item._id)
          }}>
          {item.name}
          <img className="pulse" src={item.image} alt={item.name} />
          <div>
            <img src="../assets/poke_dollar.svg" alt="pokedollar sign" />
            {item.price}
          </div>
        </div>  
      )
    })
  }


  if (id) console.log('id',id)


  const addToBasket = async e => {
    e.preventDefault()
    const body = {
      quantity: itemQty,
      item: id
    }
    if (itemInBasket) return 
    try {
      const response = await axios.post('/api/userprofile/basket', body, headers())
      setItemInBasket(true)
      console.log('the response', response)
    } catch (err) {
    // console.log(err.response.status)
      if (err.response.status === 401) {
        setNotLoggedIn(true)
        return
      }
    }
  }



  function getUserId(){
    const payload = getPayload()
    if (!payload) return false
    console.log( 'userId on pokeshow',payload.sub )
    return payload.sub
  }  
  getUserId()

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


  const handleChangeDelete = async event => { //Delete Comments Logic 
    const commentId = event.target.value 
    try {
      await deleteComment(id, commentId)
      setCommentToDelete(event.target.value) 
    } catch (err) {
      if (err.response.data.message === 'Unauthorized') {
        setUnauthorized(true)
        return 
      }
    }
  }
  

  return (

    <>
      { unauthorized ? 
        <div className="warning_overlay"> 
          <div className="message default_box_style float_up">
            <h2>Access Denied: Not the authenticated user</h2> 
            
            <div className="marchamp"> 
              <img className="main" src={marchamp} alt="marchamp security guard" />
            </div>

            <div className="button_wrapper small"> 
              <button onClick={closeWarning}>
                <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
                OK
              </button> 
            </div>  
          
          </div>
        </div>
        : 
        null 
      }    
      <div className="page_wrapper_column">
        { item ?
          <>
            <div className="product_wrapper">
              <img className= "product_image" src={item.image} alt={item.name} />
              <div className="product_info">
                <div className="rating">
                  {mapStars(itemRating(item.avgRating))}
                </div>
              
                <label>
                  {item.name}
                  <img src="../assets/poke_dollar.svg" alt="pokedollar sign" /> {item.price}
                </label>
                <div className="description">{item.description}</div>
                <div className="button_wrapper comment">
                  <Link to={`/pokecomment/${id}`}>
                    <button>
                      <img src="../assets/speech_bubble.svg" alt="speech bubble" /> Comment
                    </button>
                  </Link>
                </div>
              </div>
              <form className={`buy_wrapper ${itemInBasket && 'accepted'}`} onSubmit={addToBasket}>
                {item.stock ?
                  <p className={item.stock <= 2 && 'red_text'}> {item.stock <= 2 && 'only '}{item.stock} left in stock</p>
                  :
                  <p className="red_text">sorry, out of stock</p>
                }
                <input type="number" defaultValue={itemQty} name="qty" min="1" max={item.stock} onChange={(e)=>setItemQty(e.target.value)}/>

                { itemInBasket ? <p className="blue">Item added in basket!!</p> : null }
                { notLoggedIn ? <p className="blue">! Login to add to basket</p> : null}
                <div className="button_wrapper">
                  <button>
                    <img src="../assets/pokeball_orange.svg" alt="pokeball" /> Add to basket
                  </button>
                </div>  

              </form> 
              { itemAlreadyInBasket ? 
                <div>
                  <p>! Item already in basket</p> 
                  <button onClick={()=>setItemAlreadyInBasket(false)}>Ok</button>   {/* need styling here */}
                </div>
                : null }
            </div>

            <div className="similar_items_wrapper">
              <label>
              Similar Items
              </label>  
              {items ?
                <div className="similar_items_inner_wrapper">
                  {mapSimilarItems(similarItems)}
                </div>
              
                :
                <p> loading... </p>
              }

            </div>  

            <div className="comments_wrapper default_box_style">
              {!item ? '...Loading' : item.comments.map(comment => 
                <div className="comment_inner_wrapper" key={comment._id}>

                  {commentToDelete === comment._id ? 
                    null 
                    : 
                    <>
                      <div className="image_wrapper">
                        <img src={comment.owner.image}/> 
                        <div>{comment.owner.username}</div>
                      </div>    
                      
                      <div className="comment_right_section">
                        <div className="user_comment">
                          {comment.text}
                        </div>

                        <div className="comment_rating">
                          {mapStars(itemRating(comment.rating))}
                          <div className="button_wrapper comment">
                            <button value={comment._id} onClick={handleChangeDelete}
                            >Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
              )}
            </div>
          

          </>
          :
          !hasError ? 
            <PikachuLoadingScreen />
            :
            <section className="page_wrapper">
              <SlowPokeErrorCard 
                errorMessage='hmm... server may be down...'
              />
            </section>
        }
      </div>
    </>
  )
}

export default PokeShow

