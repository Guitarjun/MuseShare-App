import React from 'react'; //import React Component

function FilterDropdown() {
    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
        <div className="filter-dropdown">
            <label for="genre-select">Genre:</label>
            <select id="genre-select">
                <option value="all">All</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="hip-hop-rap">Hip Hop/Rap</option>
                <option value="indie">Indie</option>
                <option value="country">Country</option>
                <option value="other">Other</option>
            </select>
        </div>
    );
}

export default FilterDropdown;
