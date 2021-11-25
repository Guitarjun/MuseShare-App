import React, { useState } from 'react'; //import React Component

function FilterDropdown(props) {
    let callback = props.callback;

    const handleChangeSelect = function(event) {
        console.log("SELECTED")
        const genre = event.target.value;
        callback(genre);
    }

    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
        <div className="filter-dropdown">
            <label htmlFor="genre-select">Genre:</label>
            <select onChange={handleChangeSelect} id="genre-select">
                <option value="All">All</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Hip Hop/Rap">Hip Hop/Rap</option>
                <option value="Indie">Indie</option>
                <option value="Country">Country</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
}

export default FilterDropdown;
