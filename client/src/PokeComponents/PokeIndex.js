import React from 'react'
import { getItems } from '../lib/api'
import { useParams } from 'react-router-dom'

import PokeCard from './PokeCardIndex'

function PokeIndex() {
  const { category, searchCriteria } = useParams()
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getItems()
        setItems(data)
        // console.log('pokedexselected:', selected)
        // console.log('pokedexitems:', items)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])
  
  let filteredItem = null

  
  const filteredItems = (items)=> {
    return items.filter(item => {
      if (category === 'all' && searchCriteria === '0') {
        return item
      } else if (category === 'all') {
        return item.name.includes(searchCriteria)
      } else if (searchCriteria === '0'){
        return item.category === category
      }  else {
        return item.category === category && item.name.includes(searchCriteria)
      }
    })
  }

  if (items) filteredItem = filteredItems(items)
  // console.log('PokeIndex items:', items)
  // console.log('PokeIndex category:', category)
  // console.log('PokeIndex searchValue:', searchValue)

  return (
    <section className="">
      <div className="">
        {items ?
          <div className="">
            {filteredItem.map(item => (
              <PokeCard key={item._id} {...item} />
            ))}
          </div>
          :
          <h2 className="">
            {hasError ? 'Error' : 'loading'}
          </h2>
        }
      </div>
    </section>

  )
}


export default PokeIndex

