import React from 'react'
import { useState, useEffect } from 'react'
import { Logo } from '../components'
import { FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useGlobalContext } from '../context/appContext' 
import {useNavigate} from 'react-router-dom';


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export const Register = () => { 
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {user, isLoading, showAlert, displayAlert, registerUser, loginUser, setupUser} = useGlobalContext();



  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }


  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;

    if(!email || !password || (!isMember && !name)){
       displayAlert();
       return
    }
   
    const currentUser = {name, email, password};

    if(isMember){
      setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful!, Redirecting'})
    } else {
      setupUser({currentUser, endPoint: 'register', alertText: 'User Created!, Redirecting'})
    }
  }

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

 


  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo></Logo>
        <h3>{values.isMember ? 'isMember' : 'Register'}</h3>
        {showAlert && <Alert></Alert>}
        
        {!values.isMember && <FormRow name='name' type='text' value={values.name} handleChange={handleChange}></FormRow>}
        <FormRow name='email' type='email' value={values.email} handleChange={handleChange}></FormRow>
        <FormRow name='password' type='password' value={values.password} handleChange={handleChange}></FormRow>

        <button type='submit' disabled={isLoading} className='btn btn-block'>Submit</button>
        <button type='button' className='btn btn-block btn-hipster' disabled={isLoading} onClick={() => {
          setupUser(
              {
              currentUser:{
                email: 'testUser@test.com',
                password: 'secret'
            },
            endPoint: 'login', alertText: 'Login Successful!'})
          }}>

          {isLoading ? 'Loading...' : 'Demo App'}
        </button>

        <p>
          {values.isMember ? 'Dont have an account, register now' : 'Already have an account, isMember now'}
          <button type='button' onClick={toggleMember} className='member-btn'>
             {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
