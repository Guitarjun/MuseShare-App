import React from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function NavBar() {
    return (
        <div className="top">
            <div className="bar theme top left-align large">
                <div className="bar-item button right hide-large hover-white large text-brown" onClick={open}><i className="fa fa-bars"></i></div>
                <div className="bar-item button text-lightbrown"><span className="material-icons" aria-label="Home">music_note</span></div>
                <NavLink exact to="/" className="bar-item text-lightestbrown button hide-small hover-brown" activeClassName="selected">Projects</NavLink>
                <NavLink to="/profile" className="bar-item text-lightestbrown button hide-small hover-brown" activeClassName="selected">Profile</NavLink>
                <NavLink to="/about" className="bar-item text-lightestbrown button hide-small hover-brown" activeClassName="selected">About</NavLink>
            </div>
    </div>
    );
}

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}
