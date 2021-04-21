import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { logout } from '../lib/auth' 
import { getUserInfo } from '../lib/api.js'

import logo from '../assets/logo.svg'
import searchIcon from '../assets/search_icon.svg'
import pokeballGrey from '../assets/pokeball_grey.svg'
import pikaFace from '../assets/pika_face_icon.svg'
import pokeballOrange from '../assets/pokeball_orange.svg'
import basket from '../assets/basket.svg'


function Nav() {
  const { pathname } = useLocation()
  const history = useHistory()
  const [category, setCategory] = React.useState('')
  const [searchCriteria, setSearchCriteria] = React.useState('')
  const [categoryWidth, setCategoryWidth] = React.useState(50)
  const searchWidth = `calc(100% - ${categoryWidth}px)`
  const [userMenuDisplay, setuserMenuDisplay] = React.useState(false)
  const [userData, setUserData] = React.useState(null)
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getUserInfo()
        setUserData(data)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [pathname])
  
  if (userData) console.log('user_data',userData)
  
  const handleLogout = () => {
    logout()
    history.push('/pokelogin')
    setUserData(null)
    setuserMenuDisplay(false)
  }

  const handleSelect = e =>{
    resizeCategoryWidth(e)
    setCategory(e.target.value)
  }

  const handleInput = e =>{
    setSearchCriteria(e.target.value)
  }

  const handleSubmit = e =>{
    e.preventDefault()
    const chosenCategory = category ? category.toLowerCase() : 'all'
    const chosenSearchCriteria = searchCriteria ? searchCriteria.toLowerCase() : '0'
    history.push(`/pokeindex/${chosenCategory}/${chosenSearchCriteria}/1`) 
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
  
  function openUserMenu() {
    setuserMenuDisplay(!userMenuDisplay)
  }

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <img className="pulse" src={logo} alt="Pokezon logo" />
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
            <img src={searchIcon} alt="search icon" />
          </button>  
        </form>
      </div>
      <div className="user_nav">
        {
          !userData ? 
            <>
              <Link to="/pokeregister">
                <button>
                  <img className= "pokeball" src={pokeballGrey} alt="pokeball" /> Register
                </button>
              </Link>
              <Link to="/pokelogin">
                <button>
                  <img className= "pika" src={pikaFace} alt="pikachu" /> 
                Login
                </button>
              </Link>
            </>
            :
            <>
              <div className="profile_wrapper">
            
                {userData ?
                  <>
                    <div className="user_greeting">
                      Hello {userData.username}!
                    </div>  
                    <div className="profile_image" onClick={openUserMenu}>
                      <img src={userData.image} alt="user profile image" />
                    </div> 
                    <div onMouseLeave={()=>setuserMenuDisplay(false)} className={`user_menu ${userMenuDisplay && 'display'}`}>
                      <button onClick={handleLogout} >
                        <img src={pokeballGrey} alt="pokeball" />
                  Log out
                      </button>  
                    </div>
                  </>
                  :
                  <p>error</p>
              
                }
                
              </div>
            </>
        }
        <Link to="/pokebasket">
          <div className="basket">
            <div className="item_qty">
              <img src={pokeballOrange} alt="pokeball" /> 
            </div>
            <img src={basket} alt="shopping basket" />
          </div>  
        </Link>
      </div>  
    </div>


  )
}

export default Nav