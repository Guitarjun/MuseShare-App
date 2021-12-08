import React from "react"; //import React Component
import { NavLink } from "react-router-dom";
import FilterDropdown from './FilterDropdown';

function NavBar(props) {
    const showFilter = true;
    let currentUser = props.currentUser;
    let userEmail = null;
    let userId = null;
    let link = null;

    // If user is logged in, profile button takes them to their profile, otherwise takes them to login page
    if (currentUser) {
        userEmail = currentUser.userEmail;
        userId = userEmail.substring(0, userEmail.indexOf("@"));   // Key associated with a user (first part of email address)
        link = <NavLink to={"/profile/" + userId} activeClassName="active">Profile</NavLink>;
    } else {
        link = <NavLink to={"/upload"} activeClassName="active">Profile</NavLink>;
    }

    return (
        <nav className="navbar">
            <div className="left-wrapper">
                <ul>
                    <li>
                        <span className="material-icons" aria-label="Home">music_note</span>
                        <span>MuseShare</span>
                    </li>
                    {showFilter && <li><FilterDropdown callback={props.callback}/></li>}
                </ul>
            </div>
            <div className="right-wrapper">
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="active">Projects</NavLink>
                    </li>
                    <li>
                        {link}
                    </li>
                    <li>
                        <NavLink to="/signup" activeClassName="active">Log In</NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload" activeClassName="active">Upload Project</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
