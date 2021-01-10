import React from 'react'
import { getItems } from '../lib/api'

import PokeCard from './PokeCardIndex'

function PokeIndex() {
  const [items, setItems] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

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
            {hasError ? 'Error' : 'loading'}
          </h2>
        }
      </div>
    </section>
  )
}


export default PokeIndex