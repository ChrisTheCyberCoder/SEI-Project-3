import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, getPayload, logout } from '../lib/auth' //* get token



function Nav() {
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const [category, setCategory] = React.useState('')
  const [searchCriteria, setSearchCriteria] = React.useState('')
  const [categoryWidth, setCategoryWidth] = React.useState(50)
  const searchWidth = `calc(100% - ${categoryWidth}px)`
  const [userMenuDisplay, setuserMenuDisplay] = React.useState(false)

  function getUserId(){
    const payload = getPayload()
    if (!payload) return false
    console.log( 'userId',payload.sub )
  }  
  getUserId()
  
  const handleLogout = () => {
    logout()
    history.push('/')
    window.location.reload()
  }

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
    const chosenCategory = category ? category.toLowerCase() : 'all'
    const chosenSearchCriteria = searchCriteria ? searchCriteria.toLowerCase() : '0'
    history.push(`/pokeindex/${chosenCategory}/${chosenSearchCriteria}`) 
    // window.location.reload()
  }

  const resizeCategoryWidth = e => {
    const thinLetters = ['I','i','j','l','t','r']
    let textLength = 0
    e.target.value.split('').forEach(letter=>{
      if (thinLetters.indexOf(letter) !== -1) textLength += 5
      else if (letter === '&') textLength  -= 7
      else textLength += 9
    })

    
  
    setCategoryWidth(textLength + 30) 
  }
  //* this function resizes select's width
  
  function openUserMenu() {
    console.log('test')
    setuserMenuDisplay(!userMenuDisplay)
  }

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
                <div className="profile_image" onClick={openUserMenu}>
                  <img src="../assets/test_profile_image.jpg" alt="user profile image" />
                </div> 
                <div className={`user_menu ${userMenuDisplay && 'display'}`}>
                  <button onClick={handleLogout} >
                    <img src="../assets/pokeball_grey.svg" alt="pokeball" />
                    Log out
                  </button>  
                </div>
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