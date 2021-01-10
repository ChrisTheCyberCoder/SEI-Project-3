import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Nav() {
  const history = useHistory()
  const [category, setCategory] = React.useState('')
  const [searchCriteria, setSearchCriteria] = React.useState('')
  const [categoryWidth, setCategoryWidth] = React.useState(50)
  const searchWidth = `calc(100% - ${categoryWidth}px)`
  const [isLoggedIn] = React.useState(false)

  const username = 'Pokebros'

  const handleSelect = e =>{
    resizeCategoryWidth(e)
    setCategory(e.target.value)
  }

  const handleInput = e =>{
    setSearchCriteria(e.target.value)
  }

 
  
  const handleSubmit = e =>{
    e.preventDefault()
    // if (!searchCriteria) return

    let chosenCategory = category.toLowerCase()
    if (!category) chosenCategory = 'all'

    let chosenSearchCriteria = searchCriteria.toLowerCase()
    if (!searchCriteria) chosenSearchCriteria = '0'

    history.push(`/pokeindex/${chosenCategory}/${chosenSearchCriteria}`)
  
    // window.alert(`search ${searchCriteria} within ${category.toLowerCase()}`)
  }

  const resizeCategoryWidth = e => {
    let textLength = 0
    e.target.value.split('').forEach(letter=>{
      if (letter === 'I' || letter === 'i' || letter === 'j' || letter === 'l' || letter === 't' || letter === 'r' ) textLength += 5
      else if (letter === '&') textLength  -= 7
      else textLength += 9
    })
  
    setCategoryWidth(textLength + 30) 
  }
  //* this function resizes select's width
  

  //! note, value is deliberately spelt with capitals to get the correct string width

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <img src="../assets/logo.svg" alt="Pokezon logo" />
      </Link>
      <div className="search_wrapper">

        <form className="search"
          onSubmit={handleSubmit}
        >
          <select 
            style={{ width: `${categoryWidth}px` }}
            onChange={handleSelect}
            value={category}
          >
            <option value="All">All</option>
            <option value="Pokeballs">Pokeballs</option>
            <option value="Medicine">Medicine</option>
            <option value="Food &amp; Drink">Food &amp; Drink</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Adventure &amp; Outdoors">Adventure &amp; Outdoors</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Evolution">Evolution</option>
            <option value="Treasure">Treasure</option>
            <option value="Gardening">Gardening</option>
            <option value="Fossil">Fossil</option>
            <option value="Stationary">Stationary</option>
            <option value="Berries &amp; apricorns">Berries &amp; Apricorns</option>
            <option value="Battle Items">Battle Items</option>
            <option value="Training">Training</option>
            <option value="Potions">Potions</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewels">Jewels</option>
          </select>  
          <input 
            style={{ width: `${searchWidth}` }}
            onChange={handleInput}
            value={searchCriteria}
          />
          <button>
            <img src="../assets/search_icon.svg" alt="search icon" />
          </button>  
        </form>
      </div>
      <div className="user_nav">
        {
          !isLoggedIn ? 
            <>
              <Link to="/pokeregister">
                <button>
                  <img className= "pokeball" src="../assets/pokeball_grey.svg" alt="pokeball" /> Register
                </button>
              </Link>
              <Link to="/pokelogin">
                <button>
                  <img className= "pika" src="../assets/pika_face_icon.svg" alt="pikachu" /> 
                Login
                </button>
              </Link>
            </>
            :
            <>
              <div className="profile_wrapper">
                <div className="user_greeting">
                  Hello {username}!
                </div>  
                <Link to="/pokepurchased">
                  <div className="profile_image">
                    <img src="../assets/test_profile_image.jpg" alt="user profile image" />
                  </div> 
                </Link>
              </div>
            </>
        }
        <Link to="/pokebasket">
          <div className="basket">
            <div className="item_qty">
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
            </div>
            <img src="../assets/basket.svg" alt="shopping basket" />
          </div>  
        </Link>
      </div>  
    </div>


  )
}

export default Nav