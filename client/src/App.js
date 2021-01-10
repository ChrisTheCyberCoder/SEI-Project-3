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

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokelogin" component={PokeLogin} />
        <Route exact path="/pokeregister" component={PokeRegister} />
        <Route exact path="/pokeindex" component={PokeIndex} />
        <Route exact path="/pokebasket" component={PokeBasket} />
        <Route exact path="/pokecomment" component={PokeComment} />
        <Route exact path="/pokepayment" component={PokePayment} />
        <Route exact path="/pokepurchased" component={PokePurchased} />
        <Route exact path="/pokeshow" component={PokeShow} />
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
