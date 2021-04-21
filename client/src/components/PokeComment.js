import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { headers } from '../lib/api'


import MarchampSecurity from '../components/MarchampSecurity'

function PokeComment() {
  const [ratingTooHigh, setRatingTooHigh] = React.useState(false)
  const [notLoggedIn, setNotLoggedIn] = React.useState(false)
  const [alreadycommented, setAlreadyCommented] = React.useState(false)


  React.useEffect(() => {
    const getData = async () => {
      try { 
        await axios.get('/api/userprofile', headers())
      } catch (err) {
        if (err.response.status === 401) {
          setNotLoggedIn(true)
          return
        }
      }
    }
    getData()
  }, [])
  const { id } = useParams()
  const history = useHistory()
  const [formdata, setFormdata] = React.useState({
    text: '',
    rating: ''
  })
  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createComment(formdata)
      history.push(`/pokeshow/${id}`)
    } catch (err) {
      console.log(err)

      if (err.response.data.message === 'You have already commented') {
        setAlreadyCommented(true)
      }

      if (err.response.data.errors) {
        setRatingTooHigh(true)
      }
    }
  }
  function createComment(formdata) {
    return axios.post(`/api/items/${id}/comments`, formdata, headers() )
  }
  return (
    <section className="page_wrapper">
      {notLoggedIn ? 
        <>
          <MarchampSecurity 
            message='Access Denied: Please Login'
            link={`/pokeshow/${id}`}
            buttonText='Back'
          />
        </>                                   
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
            { ratingTooHigh ? <p>Please rate from 1-5</p> :  null }
            { alreadycommented ? <p>You have already posted a comment</p> : null}
          </div>
          <div className="button_wrapper flexend">
            <button type="submit">
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> Make a Comment
            </button>
          </div>
        </form>
      }
    </section>
  )
}
export default PokeComment