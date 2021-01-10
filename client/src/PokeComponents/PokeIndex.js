import React from 'react'
// import { getItems } from '../lib/api'

import PokeCard from './PokeCardIndex'

function PokeIndex({ items, category, searchValue }) {
  // const [items, setItems] = React.useState(null)
  // const [hasError, setHasError] = React.useState(false)

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       // const { data } = await getItems()
  //       setItems(selected)
  //       console.log('pokedexselected:', selected)
  //       console.log('pokedexitems:', items)
  //     } catch (err) {
  //       setHasError(true)
  //     }
  //   }
  //   getData()
  // }, [selected])

  console.log('PokeIndex items:', items)
  console.log('PokeIndex category:', category)
  console.log('PokeIndex searchValue:', searchValue)

  return (
    <section className="">
      <div className="">
        {items ?
          <div className="">
            {items.map(item => (
              <PokeCard key={item._id} {...item} />
            ))}
          </div>
          :
          <h2 className="">
            error
            {/* {hasError ? 'Error' : 'loading'} */}
          </h2>
        }
      </div>
    </section>
  )
}


export default PokeIndex