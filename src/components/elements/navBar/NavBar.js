import React from "react";
import { NavLink } from "react-router-dom";
//local
import "./NavBar.scss";

const NavBar = () => {
	return (
		<nav className="nav-bar">
			<NavLink to="/" activeClassName="selected">
				<span className="nav-bar__item">Manual</span>
			</NavLink>
			<NavLink to="/mapbox">
				<span className="nav-bar__item">Map</span>
			</NavLink>
		</nav>
	);
};

export { NavBar };
