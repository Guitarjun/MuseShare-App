import React from "react"; //import React Component
import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    return (
        <div className="nav-bar">
            <ul>
                <li>
                    <span className="material-icons" aria-label="Home">music_note</span>
                </li>
                <li>
                    <NavLink exact to="/" activeClassName="active">Projects</NavLink>
                </li>
                <li>
                    <NavLink exact to="/profile" activeClassName="active">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">About</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;