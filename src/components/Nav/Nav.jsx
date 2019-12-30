import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar is-hidden-print">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="title">
            <Link className="navbar-item" to="/">Proxit</Link>
          </h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/cards" className="navbar-item is-tab" activeClassName="is-active">Card Proxies</NavLink>
            <NavLink to="/decks" className="navbar-item is-tab" activeClassName="is-active">Deck Markers</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}