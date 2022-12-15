import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'

export const Error = () => {
  return (
   <Wrapper className='full-page'>
        <div>
            <img src={img} alt='not found'/>
            <h3>Ohh! Page Not Found</h3>
            <p>We can't seem to find the page youre looking for</p>
            <Link to='/'>Back Home</Link>
        </div>
   </Wrapper>
  )
}


