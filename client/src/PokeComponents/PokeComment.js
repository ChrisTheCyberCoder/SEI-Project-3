import React from 'react'
import { getToken } from '../lib/auth'
import { useHistory,useParams  } from 'react-router-dom'
import axios from 'axios'

function PokeComment() {

  // ! Done

  // in the comment form we need to collect text and rating
  // we need to axios post 
  // it's a secure route, so we need a header and token. 
  // once comment made it needs to be display on item show
  // so once comment submitted go push history to comment show

  const [ratingTooHigh, setRatingTooHigh] = React.useState(false)
  const [unauthorized, setUnauthorized] = React.useState(false)

  const { id } = useParams()

  console.log('this is the id', id)

  const history = useHistory()

  const [formdata, setFormdata] = React.useState({
    text: '',
    rating: ''
  })


  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  // console.log(formdata)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await createComment(formdata)
      console.log('the response', response)
      history.push(`/pokeshow/${id}`)
    } catch (err) {
      console.log('da error', err.response)

      if (err.response.data.message === 'Unauthorized') {
        setUnauthorized(true)
        return
      }

      if (err.response.data.errors) {
        console.log('Rating way too high')
        setRatingTooHigh(true)
      }
    }
  }

  function headers() {
    return {
      headers: { Authorization: `Bearer ${getToken()}` }
    }
  }

  function createComment(formdata) {
    return axios.post(`/api/items/${id}/comments`, formdata, headers() )
  }

  return (

    <section className="page_wrapper">
      {unauthorized ? <h1>Access Denied: Please Login</h1>

        :

        <form onSubmit={handleSubmit} className="float_up">
          <div className="input_box">
            <label>Comment</label>
            <input
              placeholder="Comment"
              name="text"
              onChange={handleChange}
              value={formdata.text}
            />
          </div>
          <div className="input_box">
            <label>Rating</label>
            <input
              placeholder="Rate from 1 - 5"
              name="rating"
              onChange={handleChange}
              value={formdata.rating}
            />
            { ratingTooHigh ? <p>Please rate from 1-5</p> : null }
          </div>
          <div className="button_wrapper">
            <button type="submit">Make a Comment</button>
          </div>
        </form>

      }
    </section>


  //text and rating needed 
  )
}

export default PokeComment