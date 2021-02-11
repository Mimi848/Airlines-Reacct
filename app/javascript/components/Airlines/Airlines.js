import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Airline from './Airline'
import styled from 'styled-components'


const Home = styled.div`
  text-align:center;
`

const Header = styled.div`
  padding:100px 100px 10px 100px;

  h1 {
    font-size:42px;
  }
`

const Subheader = styled.p`
  font-weight:300;
  font-size:26px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding:20px;
`

const Airlines = () => {

  const [airlines, setAirlines] = useState(null)

  useEffect( () => {
    axios.get('/api/v1/airlines.json')
    .then( resp => {
      setAirlines(resp.data)
    })
    .catch( data => {
      debugger
    })
  }, [])


  return(
    <Home>
      <Header>
        <h1>OpenFlights</h1>
        <Subheader>Honest, unbiased airline reviews. Share your experience.</Subheader>
      </Header>
        <Grid className="grid">
            {
              airlines?.data.map((airline, index) => (
                <Airline key={index} attributes={airline.attributes} />
              ))
            }
        </Grid>
    </Home>
  )
}

export default Airlines
