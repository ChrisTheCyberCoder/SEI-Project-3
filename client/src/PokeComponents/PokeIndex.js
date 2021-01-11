import React from 'react'
import { getItems } from '../lib/api'
import { useParams } from 'react-router-dom'

import PokeCard from './PokeCardIndex'

function PokeIndex() {
  const { category, searchCriteria } = useParams()
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)
  const [page, setPage] = React.useState(1)

  const filterItems = (items)=> {
    if (category === 'all' && searchCriteria === '0') return items
    let result = items
    result = category === 'all' ? result : result.filter(item => item.category === category )
    result = searchCriteria === '0' ? result : result.filter(item => item.name.includes(searchCriteria))
    return result
  }

  function dynamicSort(property) {
    let sortOrder = 1

    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }

    return function (a,b) {
      if (sortOrder === -1){
        return b[property].localeCompare(a[property])
      } else {
        return a[property].localeCompare(b[property])
      }        
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getItems()
        // console.log()
        setItems(data)

        // console.log('pokedexselected:', selected)
        // console.log('pokedexitems:', items)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])
  
  let filteredItems = null
  // let maxPage = null

  const itemToDisplay = 12
  const firstItem = (page - 1) * itemToDisplay

  
 
  
  const togglePage = e =>{
    console.log(e.target.innerText)
    if (e.target.innerText === 'prev') setPage(page - 1)
    if (e.target.innerText === 'next') setPage(page + 1)
    // window.location.reload()
  }
 
  if (items) {
    filteredItems = filterItems(items).sort(dynamicSort('name')).slice(firstItem,page * itemToDisplay)
  }
  
  //! sort based on price
  // if (items) console.log(filterItems(items).sort((a, b) => a.price - b.price))
 



  


  return (
    <section className="card_wrapper">
      {items ?
        <>
          {filteredItems.map(item => (
            <PokeCard key={item._id} {...item} />
          ))}
          <div className="page_wrapper">
            {
              page !== 1 &&
              <button onClick={togglePage}>
              prev
              </button>
            }
            {
              page !== Math.ceil(filterItems(items).length / 12) &&
              <button onClick={togglePage}>
              next
              </button>
            }
          </div> 
        </>
        :
        <h2 className="">
          {hasError ? 'Error' : 'loading'}
        </h2>
      }

      
    </section>

  )
}


export default PokeIndex

