import React from 'react';
import {Link} from 'react-router';

export default function Navbar({children}) {
  return <div>
    <div className="app-navbar">
      <ul className="link-nav">
        <li>Lunchbox</li>
        <li><Link to="/items/">Links &amp; Items</Link></li>
        <li><Link to="/calc">Calculated List</Link></li>
        <li><Link to="/new">New...</Link></li>
      </ul>
    </div>
    
    {children}
  </div>;
}
