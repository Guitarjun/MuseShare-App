import React from 'react'; //import React Component

function FilterPanel() {
    return (
        <div class="filter-panel">

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

export default FilterPanel;
