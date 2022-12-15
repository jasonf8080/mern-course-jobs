import React from 'react'
import { NavLink } from 'react-router-dom';
import { links } from '../utils/links';

export const NavLinks = ({toggleSidebar}) => {

  return (
    <div className="nav-links">
        {links.map((item) => {
            const {text, path, id, icon} = item;
            return (
            <NavLink key={id} to={path} onClick={toggleSidebar} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="icon">{icon}</span>
                {text}
            </NavLink>)
        })}
    </div>
  )
}
