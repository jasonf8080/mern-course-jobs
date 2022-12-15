import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useGlobalContext } from '../context/appContext'
import { NavLinks } from './NavLinks'
import Logo from './Logo'

export const BigSidebar = () => {
    const {showSidebar} = useGlobalContext();

  return (
    <Wrapper>
        <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
            <div className="content">
                <header>
                    <Logo/>

                </header>

                <NavLinks></NavLinks>
            </div>
        </div>
    </Wrapper>
  )
}
