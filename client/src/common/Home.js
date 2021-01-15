import React from 'react'
import { getItems } from '../lib/api'
// import dynamicSort from '../lib/sort'
import { Link } from 'react-router-dom'

import PikachuLoadingScreen from '../PokeComponents/PikachuLoadingScreen'
import SlowPokeErrorCard from '../PokeComponents/SlowpokeErrorCard'

import leftArrow from '../assets/arrow_left_white.svg'
import rightArrow from '../assets/arrow_right_white.svg'
import pokeDollar from '../assets/poke_dollar.svg'
import pokeDollarOrange from '../assets/poke_dollar_orange.svg'

function Home() {
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)
  const [heroPos, setHeroPos] = React.useState(0)
  const [randomItems, setRandomItems] = React.useState([])
  const [randomPokeball, setRandomPokeball] = React.useState({})
  const [randomBerry, setRandomBerry] = React.useState({})
  const [randomCheapItem, setRandomCheapItem] = React.useState({})

  
  let interval = null
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getItems()
        setItems(data)
        setRandomItems(makeRandomArray(data))
        setRandomPokeball(pickRandomItem(data,'pokeballs'))
        setRandomBerry(pickRandomItem(data,'berries & apricorns'))
        setRandomCheapItem(pickRandomCheapItem(data))
        // console.log(data)
      } catch (err) {
        setHasError(true)
        // console.log(err)
      }
    }
    getData()
    interval = setInterval(() => {
      nextHero()
    }, 2000)
    return () => clearInterval(interval)
    
  }, [])
  
  function pickRandomItem(array,category){
    const filteredArray = array.filter(item=>{
      return item.category === category
    })
    return filteredArray[Math.floor(Math.random() * filteredArray.length)]
  }

  function pickRandomCheapItem(array){
    const filteredArray = array.filter(item=>{
      return item.category !== 'berries & apricorns' && item.price < 200
    })
    return filteredArray[Math.floor(Math.random() * filteredArray.length)]
  }


  function makeRandomArray(array){
    const randomItems = []
    const filteredArray = array.filter(item=>{
      return item.category !== 'pokeballs' && item.category !== 'berries & apricorns'
    })
    for (let i = 0 ; i < 4; i++){
      randomItems.push(filteredArray[Math.floor(Math.random() * filteredArray.length)])
    }
    return randomItems
  }

  function mapSmallBoxes(array){
    if (!items) return
    return (
      <div className="inner_wrapper" >
        {array.map(item=>{
          return (
            <Link to={`/pokeshow/${item._id}`} key={item.name}>
              <div className="small_box" >
                <p>{item.name}</p>
                <img className="pulse" src={item.image} alt={item.name} />
                <p><img src={pokeDollar} alt="pokedollar sign" />{item.price}</p>
              </div>  
            </Link>
          ) 
        })}
      </div>
    )
  }
  
  //* change class
  function mapOneItem(item){
    return ( 
      <Link to={`/pokeshow/${item._id}`} key={item.name}>
        <div className="single_wrapper" >
          
          <img className="pulse" src={item.image} alt={item.name} />
          <p>{item.name} <img src={pokeDollar} alt="pokedollar sign" />{item.price}</p>
        </div>  
      </Link>
    )
  }

  // if (randomItems) console.log('r',randomItems[0])


  const nextHero = () =>{ 
    clearInterval(interval)
    const  newPos = heroPos > -400 ? heroPos - 100 : 0
    // console.log('page',newPos)
    setHeroPos(newPos)
   
    // setSlideIsAuto(false)
  }

  const prevHero = () =>{
    clearInterval(interval)
    const newPos = heroPos < 0 ? heroPos + 100 : -400
    setHeroPos(newPos)
    // setSlideIsAuto(false)
  }
  

  

  //! this may not be required

  let filteredItems = null
  
  React.useEffect(() => {
    if (items){
      // filteredItems = items.sort(dynamicSort('name'))
      filteredItems = items.sort((a, b) => a.price - b.price)
      console.log('fil',filteredItems)
      
    }
  }, [items])

  //! sort based on price
  // if (items) console.log(filterItems(items).sort((a, b) => a.price - b.price))


  return (
    <>
      {items ?
        <>
          <div className="home_hero_wrapper">
            <div className="left_arrow"  onClick={prevHero}>
              <img className="left" src={leftArrow} alt="left arrow" />
            </div>  
            <div className="inner_wrapper">
              
              <div className="hero" style = {{ left: `${heroPos}%` }}>
                <img
                  src="../assets/pokezon.png" 
                  alt="pokezon hero image"
                />  
              </div>

              <div className="hero" style = {{ left: `${heroPos}%` }}>
                <img
                  src="../assets/catch.png" 
                  alt="Catch pokemon with Master ball"
                />  
              </div>

              <div className="hero" style = {{ left: `${heroPos}%` }}>
                <img
                  src="../assets/prime.png" 
                  alt="Pokezon prime coming soon"
                />  
              </div>
          
              <div className="hero" style = {{ left: `${heroPos}%` }}>
                <img
                  src="../assets/battle.png" 
                  alt="Trainers get your items here"
                />  
              </div>
          
              <div className="hero" style = {{ left: `${heroPos}%` }}>
                <img
                  src="../assets/podcast.png" 
                  alt="Pokezon podcast coming soon"
                />  
              </div>
            </div>
    
            <div className="right_arrow" onClick={nextHero}>
              <img className="right" src={rightArrow} alt="right arrow" />
            </div> 
          </div>

          <div className="home_content_wrapper float_up_no_margin">
            <div className="home_section grey_background quarter">
              <label>Random Pick</label>
              {mapSmallBoxes(randomItems)}
            </div>  
            <div className="home_section single default_box_style quarter">
              <label>Catch &apos;em all!</label>
              {mapOneItem(randomPokeball)}
            </div>  
            <div className="home_section single default_box_style quarter">
              <label>Berries!!</label>
              {mapOneItem(randomBerry)}
            </div>  
            <div className="home_section single default_box_style quarter">
              <label className="cheap_item">Under <img src={pokeDollarOrange} alt="pokedollar sign" />200</label>
              {mapOneItem(randomCheapItem)}
            </div>  
          </div> 
          {/* <div className="home_content_wrapper">
            <div className="home_section default_box_style half">
            </div>  
            <div className="home_section  default_box_style half">
            </div>  
          </div>  may add extra filter if we have time*/}
        </>
        :
        hasError ? 
          <section className="page_wrapper">
            <SlowPokeErrorCard
              errorMessage='hmm... server may be down...'
            />
          </section>
          : 
          <PikachuLoadingScreen/>

        
      }
    </>
  )
}

export default Home

