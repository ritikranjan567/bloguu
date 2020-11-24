import React from 'react'
import { Link } from 'react-router-dom'
import {SignedInNav, SignedOutNav} from './index'
import {connect} from 'react-redux'

class Header extends React.Component{

  handleClick = () => {
    let instances = M.Sidenav.init(document.querySelector(".sidenav"));
    instances.open();
  }

  /* closeNav = () => {
    let instances = M.Sidenav.init(document.querySelector(".sidenav"));
    instances.close();
  } */

  render() {
    const currentNav = (this.props.user)? <SignedInNav /> : 
    <SignedOutNav />
    return (
      <header>
        <nav className="grey darken-3 nav-padded">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Bloguu</Link>
            <div className="sidenav-trigger hide-on-large-only hide-on-extra-large-only cursor-pointer" data-target="mobile-nav" id="trigger_menu" onClick={this.handleClick}>
              <i className="material-icons">menu</i>
            </div>
            <ul className="right hide-on-med-and-down">
              {currentNav}
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-nav">
          {currentNav}
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser
})

export default connect(mapStateToProps)(Header);