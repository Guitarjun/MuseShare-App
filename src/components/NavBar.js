import React from "react"; //import React Component
import { NavLink } from "react-router-dom";
import FilterDropdown from './FilterDropdown';

function NavBar() {
    const showFilter = true;
    return (
        <nav className="navbar">
            <div className="left-wrapper">
                <ul>
                    <li>
                        <span className="material-icons" aria-label="Home">music_note</span>
                        <span>MuseShare</span>
                    </li>
                    {showFilter && <li><FilterDropdown /></li>}
                </ul>
            </div>
            <div className="right-wrapper">
                <ul>
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
        </nav>
    );
}

export default NavBar;
