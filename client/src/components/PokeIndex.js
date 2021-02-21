import React from 'react'
import { getItems } from '../lib/api'
import { useParams, useHistory } from 'react-router-dom'

import PikachuLoadingScreen from './PikachuLoadingScreen'
import PokeCard from './PokeCardIndex'

import leftArrow from '../assets/arrow_left_orange.svg'
import rightArrow from '../assets/arrow_right_orange.svg'
import dynamicSort from '../lib/sort'



function PokeIndex() {
  const history = useHistory()
  const { category, searchCriteria, page } = useParams()
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

  const filterItems = (items)=> {
    if (category === 'all' && searchCriteria === '0') return items
    let result = items
    result = category === 'all' ? result : result.filter(item => item.category === category )
    result = searchCriteria === '0' ? result : result.filter(item => item.name.includes(searchCriteria))
    return result
  }
  
  //* styling for the load animation
  // function load() {
  //   setPikaPos({ pika: 'calc(100% - 100px)', bar: '100%' })
  // }
  
  //* scrolls to top of page when page is changed 
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])
  

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
  
  let filteredItems = null

  const itemToDisplay = 12
  const firstItem = (page - 1) * itemToDisplay
  
  
  function prevPage(){
    history.push(`/pokeindex/${category}/${searchCriteria}/${Number(page) - 1}`)
  }
  function nextPage(){
    history.push(`/pokeindex/${category}/${searchCriteria}/${Number(page) + 1}`)
  }

  function goToPage(pageNo){
    if (pageNo === '...' || pageNo === '...+' ) return
    history.push(`/pokeindex/${category}/${searchCriteria}/${pageNo}`)
  }
 
  if (items) {
    filteredItems = filterItems(items).sort(dynamicSort('name')).slice(firstItem,page * itemToDisplay)
  }


  function mapPageLinks(maxvalue){
    const pages = []
    for (let i = 1; i <= maxvalue; i++ ){
      switch (i) {
        case 1: pages.push(i)
          break
        case Number(page): pages.push(i)
          break    
        case (Number(page) - 1): 
          pages.push(i)
          break
        case (Number(page) + 1): 
          pages.push(i)
          break  
        case maxvalue - 1: 
          pages.push('...+')
          break  
        case maxvalue: pages.push(i)
          break
        default: pages.push('...')
      }
    } 
    const buttonsToDisplay =  [...new Set(pages)]
    return buttonsToDisplay.map(eachPage=>{
      return (
        <button className={`page_button ${eachPage === Number(page) ? 'current' : ''} ${eachPage[0] === '.' ? 'null' : ''}`} key={`page${eachPage}` } alt="button" onClick={()=>{
          goToPage(eachPage)
        }}>{eachPage === '...+' ? '...' : eachPage}</button>
      )
    })
  }


  return (
    <section className="card_wrapper">
      {items ?
        <>
          {filteredItems.map(item => (
            <PokeCard key={item._id} {...item} />
          ))}
          <div className="pagination_wrapper">
            <div className="inner_wrapper">
              {
                Number(page) !== 1 &&
                <button onClick={prevPage}>
                  <img className="left" src={leftArrow} alt="left arrow" />
                Prev
                </button>
              }
              { 
                mapPageLinks(Math.ceil(filterItems(items).length / 12))
              }
              {
                Number(page) !== Math.ceil(filterItems(items).length / 12) &&
                <button onClick={nextPage}>   
                  Next
                  <img className="right" src={rightArrow} alt="right arrow" />
                </button>
              }
            </div>
          </div> 
        </>
        :
      
        <>
          {hasError ? 
            <h2 className="">
              Error
            </h2>
            : 
            <PikachuLoadingScreen/>
          }
        </>
      }

      
    </section>

  )
}


export default PokeIndex


{/* <div className="center_box">
<div className="bar">
  <div className="inside"></div>
</div>
<img className="pika" src={pika} alt="pikachu" />
</div>  */}