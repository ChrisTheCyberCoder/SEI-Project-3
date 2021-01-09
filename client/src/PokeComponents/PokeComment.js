import React from 'react'


function PokeComment() {


  const [formdata, setFormdata] = React.useState({
    text: '',
    rating: ''
  })


  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  // console.log(formdata)

  return (

    <section>
      <form>
        <div>
          <label>Text</label>
          <input
            placeholder="Text"
            name="text"
            onChange={handleChange}
            value={formdata.text}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            placeholder="Rating"
            name="rating"
            onChange={handleChange}
            value={formdata.rating}
          />
        </div>
      </form>
    </section>


  //text and rating needed 
  )
}

export default PokeComment