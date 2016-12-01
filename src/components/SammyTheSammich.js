import React from 'react';
import {Link} from 'react-router';

// Why? Because funny things in code is always good.
export default function SammyTheSammich() {
  return <div className="app-sammy">
    <h1>Sammy the Sammich welcomes you.</h1>
    <img src="images/logo.svg" alt="Sammy the Sammich" />
    <p>
      But seriously, you'll probably want
      to <Link to="/new">add some items or recipes</Link>,&nbsp;
      <Link to="/calc">check off some items at the store</Link>,
      or <Link to="/grocery">add items to your list</Link>.
    </p>
  </div>;
}
