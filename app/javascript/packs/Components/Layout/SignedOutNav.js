import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutNav = () => {
  return (
    <Fragment>
      <li className="sidenav-close">
        <NavLink to="/sign-up">Sign-up</NavLink>
      </li>
      <li className="sidenav-close">
        <NavLink to="/login">Login</NavLink>
      </li>
    </Fragment>
  );
}

export default SignedOutNav;