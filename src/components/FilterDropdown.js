import React, { useState } from 'react'; //import React Component

function FilterDropdown(props) {
    let callback = props.callback;

    const [currentGenre, setGenre] = useState('All');

    const handleChangeSelect = function(event) {
        console.log("SELECTED")
        let genre = event.target.value;
        if (genre != currentGenre) {
            setGenre(genre);
        }
    }

    const handleClick = function(event) {
        callback(currentGenre);
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
            <button type="button" onClick={handleClick} className="btn-light btn m-2 mb-3">Apply Filter</button>
        </div>
    );
}

export default FilterDropdown;
