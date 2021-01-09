import React from 'react'

function Nav() {
  const [category, setCategory] = React.useState('')
  const [searchCriteria, setSearchCriteria] = React.useState('')
  const [categoryWidth, setCategoryWidth] = React.useState(50)
  const searchWidth = 500 - categoryWidth

  const handleSelect = e =>{
    resizeCategoryWidth(e)
    setCategory(e.target.value)
  }

  const handleInput = e =>{
    setSearchCriteria(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    window.alert(`search ${searchCriteria} within ${category}`)
  }

  const resizeCategoryWidth = e => {
    const value = (e.target.value.replace('i','').replace('r','').length * 10 + 20) > 190 ? 190 : (e.target.value.replace('i','').length * 10 + 20)
    setCategoryWidth(value) 
  }
  // conside refactoring this syntax (standardise function syntax)
  //* this function resizes select's width


  return (
    <div className="nav">
      <div className="logo">
        <img src="../assets/logo.svg" alt="Pokezon logo" />
      </div>  
      <div className="search_wrapper">

        <form className="search"
          onSubmit={handleSubmit}
        >
          <select 
            style={{ width: `${categoryWidth}px` }}
            onChange={handleSelect}
            value={category}
          >
            <option value="all">All</option>
            <option value="pokeballs">Pokeballs</option>
            <option value="medicine">Medicine</option>
            <option value="food &amp; drink">Food &amp; Drink</option>
            <option value="vitamins">Vitamins</option>
            <option value="adventure &amp; outdoors">Adventure &amp; Outdoors</option>
            <option value="musical instruments">Musical Instruments</option>
            <option value="evolution">Evolution</option>
            <option value="treasure">Treasure</option>
            <option value="gardening">Gardening</option>
            <option value="fossil">Fossil</option>
            <option value="stationary">Stationary</option>
            <option value="berries &amp; apricorns">Berries &amp; Apricorns</option>
            <option value="battle items">Battle Items</option>
            <option value="training">Training</option>
            <option value="potions">Potions</option>
            <option value="clothing">Clothing</option>
            <option value="jewels">Jewels</option>
          </select>  
          <input 
            style={{ width: `${searchWidth}px` }}
            onChange={handleInput}
            value={searchCriteria}
          />
          <button>
            <img src="../assets/search_icon.svg" alt="search icon" />
          </button>  
        </form>
      </div>
      <div className="user_nav">
        <button>
          <img className= "pokeball" src="../assets/pokeball_grey.svg" alt="pokeball" /> register
        </button>
        <button>
          <img className= "pika" src="../assets/pika_face_icon.svg" alt="pikachu" /> 
          login
        </button>
        <div className="basket">
          <div className="item_qty">
            <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
          </div>
          <img src="../assets/basket.svg" alt="shopping basket" />
        </div>  
      </div>  
    </div>


  )
}

export default Nav