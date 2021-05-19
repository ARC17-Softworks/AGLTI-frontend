import React from 'react';
import './search-box.styles.css';

const SearchBox = () => {
    return (
    <input 
        className="search"
        type="search" 
        placeholder= "Search" 
        // onChange = { handleChange }
    />
    )
}

export default SearchBox