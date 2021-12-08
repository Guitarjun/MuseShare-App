import React from "react"; //import React Component
import { NavLink } from "react-router-dom";
import FilterDropdown from './FilterDropdown';

function NavBar(props) {
    const showFilter = true;
    let currentUser = props.currentUser;
    let userEmail = currentUser.userEmail;
    let userUrl = userEmail.substring(0, userEmail.indexOf("@"));   // Key associated with a user (first part of email address)

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
                        <NavLink to={"/profile/" + userUrl} activeClassName="active">Profile</NavLink>
                        {/* Need to go to sign up page if user is not logged in */}
                    </li>
                    <li>
                        <NavLink to="/signup" activeClassName="active">Log In</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
