import React from 'react'; //import React Component

export function SideBar() {
    return (
        <div>
            <nav className="sidebar bar-block collapse large animate-left" id="mySidebar">
                <a onClick={close} className="right xlarge padding-large hover-brown hide-large text-lightestbrown" title="Close Menu">
                    <i className="fa fa-remove"></i>
                </a>
                <div className="text-lightbrown">
                    <h4 className="bar-item text-lightestbrown"><b>Genres</b></h4>
                    {/* Use NavLinks for a's below */}
                    <a className="bar-item button hover-brown" href="#">All</a>
                    <a className="bar-item button hover-brown" href="#">Rock</a>
                    <a className="bar-item button hover-brown" href="#">Pop</a>
                    <a className="bar-item button hover-brown" href="hip-hop.html">Hip Hop/Rap</a>
                    <a className="bar-item button hover-brown" href="#">Indie</a>
                    <a className="bar-item button hover-brown" href="#">Country</a>
                    <a className="bar-item button hover-brown" href="#">Other</a>
                </div>
            </nav>
            <div className="overlay hide-large text-lightestbrown" onClick={close} style={{cursor:'pointer'}} title="close side menu"></div>
        </div>
    );
}

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Close the sidebar with the close button
function close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}