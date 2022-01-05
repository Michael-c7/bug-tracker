import React from 'react'
import { GoSearch } from "react-icons/go"

// searchTableRef, setSearchInput
const Search = (props) => {
    const {
        searchTableRef, setSearchInput
    } = props.searchData;


    return (
        <div className="search">
            <GoSearch className="search__icon"/>
            <label>
                <input className="search-input-text" type="search" placeholder="Search" ref={searchTableRef} onChange={() => setSearchInput(searchTableRef.current.value)}/>
            </label>
        </div>
    )
}

export default Search
