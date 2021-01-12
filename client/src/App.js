import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './common/Home'
import Nav from './common/Nav'

import PokeLogin from './auth/PokeLogin'
import PokeRegister from './auth/PokeRegister'

import PokeBasket from './PokeComponents/PokeBasket'
import PokeComment from './PokeComponents/PokeComment'
import PokePayment from './PokeComponents/PokePayment'
import PokePurchased from './PokeComponents/PokePurchased'
import PokeShow from './PokeComponents/PokeShow'
import PokeIndex from './PokeComponents/PokeIndex'
import PokeProfile from './PokeComponents/PokeProfile'
import PokeConfirmation from './PokeComponents/PokeConfirmation'
import PokeCheckout from './PokeComponents/PokeCheckout'


// import { getItems } from './lib/api'

function App() {

  // const [selectedItems, setSelectedItems] = React.useState([])
  // const [selectedCategory, setSelectedCategory] = React.useState('all')  
  // const [selectedCategory] = React.useState('all')
  // const [searchCriteria, setSearchCriteria] = React.useState('')
  // const [items, setItems] = React.useState([])
  // const [hasError, setHasError] = React.useState(false)



  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await getItems()
  //       setItems(data)
  //       // console.log(items)
  //     } catch (err) {
  //       setHasError(true)
  //       console.log(hasError)
  //     }
  //   }
  //   getData()
  // }, [])

  // React.useEffect(() => {
  //   // selection(items)
  // }, [searchCriteria])

  // function selection(items) {
  // // console.log('items:', items)
  // const selItems = items.filter(item => {
  //   const { name, category } = item
  //   // console.log('selectedCategory:', selectedCategory.replace('> ',''))
  //   if ((category === selectedCategory.replace('> ','') || selectedCategory.replace('> ','') === 'all') && (name.toLowerCase().includes(searchCriteria.replace(' > ','').toLowerCase()) || searchCriteria.replace('> ','') === '') ){
  //     return true
  //   } 
  //   return false
  // })
  // // console.log('selItems:', selItems)

  // setSelectedItems(selItems)
  // }

  // function handleSearch(e) {
  //   console.log(e)
  //   if (e.target.value === ''){
  //     setSearchCriteria(searchCriteria.replace(searchCriteria,''))
  //   } else {
  //     setSearchCriteria(searchCriteria.replace(searchCriteria,' > ' + e.target.value ))
  //   }

  // }

  // function handleCategoryFilter(e) {
  //   console.log(e)
  //   if (e.target.value === 'All'){
  //     setSelectedCategory(selectedCategory.replace(selectedCategory,''))
  //   } else {
  //     setSelectedCategory(selectedCategory.replace(selectedCategory,'> ' + e.target.value ))
  //   }  
  // }
  
  /* <Nav search={handleSearch} categoryFilter={handleCategoryFilter} category={selectedCategory} searchCriteria={searchCriteria}/> */

  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokelogin" component={PokeLogin} />
        <Route exact path="/pokeregister" component={PokeRegister} />
        <Route exact path="/pokeprofile" component={PokeProfile} />
        {/* <Route exact path="/pokeindex" component={() => <PokeIndex items={selectedItems} category={selectedCategory} searchValue={searchCriteria}/>} /> */}
        <Route path="/pokeindex/:category/:searchCriteria" component={PokeIndex} />
        <Route exact path="/pokebasket" component={PokeBasket} />
        <Route exact path="/pokecomment/:id" component={PokeComment} />
        <Route exact path="/pokepayment" component={PokePayment} />
        <Route exact path="/pokepurchased" component={PokePurchased} />
        <Route path="/pokeshow/:id" component={PokeShow} />
        <Route path="/pokeconfirmation" component={PokeConfirmation} />
        <Route path="/pokecheckout" component={PokeCheckout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
















// import React from 'react'

// class App extends React.Component {
//   async componentDidMount() {
//     try {
//       const response = await fetch('/api/resource-name')
//       const data = await response.json()
//       console.log(data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   render() {
//     return null
//   }
// }

// export default App
