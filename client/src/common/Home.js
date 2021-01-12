import React from 'react'
// import PokeCardHome from '../PokeComponents/PokeCardHome'
// import '../styles/Home.scss'
import { getItems } from '../lib/api'
import dynamicSort from '../lib/sort'

function Home() {
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)
  const [heroPos, setHeroPos] = React.useState(100)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getItems()
        setItems(data)
      } catch (err) {
        setHasError(true)
        // console.log(err)
      }
    }
    
    
    getData()
    const interval = setInterval(() => {
      nextHero()
    }, 2000)
    return () => clearInterval(interval)
    
  }, [])


  const nextHero = () =>{ 
    const  newPos = heroPos > -100 ? heroPos - 100 : 100
    setHeroPos(newPos)
  }

  const prevHero = () =>{
    const newPos = heroPos < 100 ? heroPos + 100 : -100
    setHeroPos(newPos)
  }
  

  //! create custom filter for different purpose, perhaps enter different parameters like category or price
  // const filterItems = (items)=> {
  //   if (category === 'all' && searchCriteria === '0') return items
  //   let result = items
  //   result = category === 'all' ? result : result.filter(item => item.category === category )
  //   result = searchCriteria === '0' ? result : result.filter(item => item.name.includes(searchCriteria))
  //   return result
  // }

  let filteredItems = null
  
  if (items) console.log(items)
  if (items) {
    filteredItems = items.sort(dynamicSort('name'))
    console.log(filteredItems)
  }


  return (
    <>
      <div className="home_hero_wrapper">
        <div className="left_arrow"  onClick={prevHero}>
        </div>  
        <div className="inner_wrapper">
          <div className="hero" style = {{ left: `${heroPos}%` }}>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
              alt=""
            />  
          </div>
          
          <div className="hero" style = {{ left: `${heroPos}%` }}>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
              alt=""
            />  
          </div>
          
          <div className="hero" style = {{ left: `${heroPos}%` }}>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
              alt=""
            />  
          </div>
        </div>
    
        <div className="right_arrow" onClick={nextHero}>
        </div> 
      </div>
      {items ?
        <>
          <div className="home_content_wrapper">
            <div className="home_section quarter">
            </div>  
            <div className="home_section quarter">
            </div>  
            <div className="home_section quarter">
            </div>  
            <div className="home_section quarter">
            </div>  
          </div> 
          <div className="home_content_wrapper">
            <div className="home_section half">
            </div>  
            <div className="home_section half">
            </div>  
          </div> 
        </>
        :
        hasError ? 
          
          <p>error</p> 
          : 
          <p>loading</p> 

        
      }
    </>
  )
}

export default Home



// <div className="home__row">
// <PokeCardHome
//   title="Código Limpio / Clean Code : Robert C. Martin"
//   price={9361}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// <PokeCardHome
//   title="Código Limpio / Clean Code : Robert C. Martin"
//   price={9361}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// <PokeCardHome
//   title="Código Limpio / Clean Code : Robert C. Martin"
//   price={9361}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// <PokeCardHome
//   id="6987"
//   title="Book : Javascript: Javascript Programming For Absolute Be..."
//   price={1349}
//   rating={5}
//   image="https://http2.mlstatic.com/D_NQ_NP_794903-MLA26289240932_112017-O.webp"
// />
// </div>

// <div className="home__row">
// <PokeCardHome
//   title="Book : React For Real Front-end Code, Untangled - Fischer,.."
//   price={4720}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// <PokeCardHome
//   title="Book : React Design Patterns And Best Practices Build Easy.."
//   price={4800}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// </div>

// <div className="home__row">
// <PokeCardHome
//   title="Book : Python Crash Course The Introduction To Programming.."
//   price={4951}
//   rating={5}
//   image="https://via.placeholder.com/300"
// />
// </div>

