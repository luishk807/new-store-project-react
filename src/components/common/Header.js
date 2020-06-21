import React, {forwardRef} from 'react';
import Link from 'next/link'

import Cart from '../../svg/cart.svg';
import AccountIcon from '../../svg/user.svg';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top main-nav-panel">
      <Link href="/"><a className="navbar-brand"><img src="/images/logo-white.png" alt="" /></a></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link active">
                <Cart width='40px' height="50px"/>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link">
                <AccountIcon width='40px' height="50px" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
 
export default Header;