import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useGlobalContext } from '../context/appContext'
import Logo from './Logo'
import {FaTimes} from 'react-icons/fa'
import { NavLinks } from './NavLinks'

export const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useGlobalContext();

  return (
    <Wrapper>
        <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
          <div className="content">
            <button type='button' className='close-btn' onClick={toggleSidebar}><FaTimes/></button>
            
            <header>
              <Logo/>

              <NavLinks toggleSidebar={toggleSidebar}></NavLinks>
              
            </header>
          </div>
        </div>
    </Wrapper>
  )
}
