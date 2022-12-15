
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'
import { Logo } from  '../components'
import { Navigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import React from 'react';


export const Landing = () => {

    const {user} = useGlobalContext();


  return (

    <React.Fragment>
       {user &&  <Navigate to='/'/>}

        <Wrapper>
                <nav>
                    <Logo/>
                </nav>

                <div className="container page">
                    <div className="info">
                        <h1>Job <span>Tracking</span> App</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Saepe nulla amet ea dicta in voluptas corrupti maxime tenetur. Odit,
                            molestiae voluptate! Maxime laboriosam soluta commodi eaque?
                        </p>
                        <Link to='/register' className="btn btn-hero">Login/Register</Link>
                    </div>
                    
                    <img src={main} alt="" className="img main-img" />
                </div>
        </Wrapper>
   </React.Fragment>
  )
}




