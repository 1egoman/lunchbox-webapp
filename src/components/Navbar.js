import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

export default function Navbar({router, children}) {
  let path = router.location.pathname;
  return <div>
    <div className="app-navbar">
      <ul className="link-nav">
        {/* Nav branding stuff */}
        <li className="nav-brand">
          <img src="images/logo.svg" role="presentation" />
          <span>Lunchbox</span>
        </li>
        <li className={classnames({active: path.startsWith('/items')})}>
          <Link to="/items/">Directory</Link>
        </li>
        <li className={classnames({active: path.startsWith('/grocery')})}>
          <Link to="/grocery">Grocery List</Link>
        </li>
        <li className={classnames({active: path.startsWith('/pantry')})}>
          <Link to="/pantry">Pantry</Link>
        </li>

        <li className="seperator">|</li>

        <li className={classnames({active: path.startsWith('/calc')})}>
          <Link to="/calc">Calculated List</Link>
        </li>
        <li className={classnames({active: path.startsWith('/new')})}>
          <Link to="/new">New...</Link>
        </li>
      </ul>
    </div>
    
    {children}
  </div>;
}
