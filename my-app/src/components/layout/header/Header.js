import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

const Header = () => {
  return (
    <React.Fragment>
      <nav className={classes.nav}>
      <NavLink activeClassName={classes.navActive} to='/SignUp'><p className={classes.nav_btns}>SignUp</p></NavLink>
      <NavLink activeClassName={classes.navActive} to='/SignIn'><p className={classes.nav_btns}>Sign In</p></NavLink>
      </nav>
      
    </React.Fragment>
  )
}

export default Header