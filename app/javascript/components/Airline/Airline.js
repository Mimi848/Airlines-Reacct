
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import Review from './Review'
import ReviewForm from './ReviewForm'


const Column = styled.div`
  background: #fff;
  max-width: 50%;
  width: 50%;
  float: left;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: scroll;
`
const Airline = (props) => {
  const [airline, setAirline] = useState(null)
  const [review, setReview] = useState({
    title: '',
    description: '',
    score: 5})
  const [loaded, setLoaded] = useState(false)
  const [dataname, setDataname] = useState('hello')
  const [rating, setRating] = useState(2)


  useEffect( () => {
    const slug = props.match.params.slug
    const url = '/api/v1/airlines/' + slug

    axios.get(url)
    .then( (resp) => {
      setAirline(resp.data)
      setDataname(resp.data.data.attributes.name)
      setLoaded(true)
    })
    .catch( data => {
      console.log('mae phat chuka hu : ' + data);
    })
  }, [])
  let reviews
  if (loaded) {
    reviews = airline.included.map( (review) => {
      return (
        <Review
          key={review.id}
          title={review.attributes.title}
          description={review.attributes.description}
          score={review.attributes.score}
        />
      )
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    // setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    setReview({[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const airline_id = airline.data.id
    axios.post('/api/v1/reviews', { ...review, airline_id })
    .then( (resp) => {
        const included = [ ...airline.included, resp.data.data ]
        setAirline({ ...airline, included })
    })
    .catch( resp => console.log(resp))
  }

  return(
    <div>
      <Column>
        {
          loaded
          ? <Header attributes={airline.data.attributes} />
          : null
        }
        <div className="reviews">
          {reviews}
        </div>
      </Column>
      <Column>
        <ReviewForm
          name= {dataname}
          review={review}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
        />
      </Column>
    </div>
  )

}

export default Airline
