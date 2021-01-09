import React from 'react'
import PokeCardHome from '../PokeComponents/PokeCardHome'
import '../styles/Home.scss'

function Home() {


  return (
    <>
      <div className="home">
        <img
          className="home__image" 
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
          alt=""
        />
        {/* PokeCardHome Id, title, prince, rating, image */}
        <div className="home__row">
          <PokeCardHome
            title="Código Limpio / Clean Code : Robert C. Martin"
            price={9361}
            rating={5}
            image="https://via.placeholder.com/300"
          />
          <PokeCardHome
            title="Código Limpio / Clean Code : Robert C. Martin"
            price={9361}
            rating={5}
            image="https://via.placeholder.com/300"
          />
          <PokeCardHome
            title="Código Limpio / Clean Code : Robert C. Martin"
            price={9361}
            rating={5}
            image="https://via.placeholder.com/300"
          />
          <PokeCardHome
            id="6987"
            title="Book : Javascript: Javascript Programming For Absolute Be..."
            price={1349}
            rating={5}
            image="https://http2.mlstatic.com/D_NQ_NP_794903-MLA26289240932_112017-O.webp"
          />
        </div>

        <div className="home__row">
          <PokeCardHome
            title="Book : React For Real Front-end Code, Untangled - Fischer,.."
            price={4720}
            rating={5}
            image="https://via.placeholder.com/300"
          />
          <PokeCardHome
            title="Book : React Design Patterns And Best Practices Build Easy.."
            price={4800}
            rating={5}
            image="https://via.placeholder.com/300"
          />
        </div>

        <div className="home__row">
          <PokeCardHome
            title="Book : Python Crash Course The Introduction To Programming.."
            price={4951}
            rating={5}
            image="https://via.placeholder.com/300"
          />
        </div>

        {/* PokeCardHome*/}

      </div>
    </>
  )
}

export default Home