import React from 'react'

// needs: amountOfEntriesRef, SetAmountOfEntriesState

const Entries = (props) => {
    const {
        amountOfEntriesRef, SetAmountOfEntriesState
    } = props.entriesData;

    return (
       <div className="entries">
            <span>Show </span> 
            <label>
                <select name="amount-of-entries" ref={amountOfEntriesRef} onChange={() => SetAmountOfEntriesState(Number(amountOfEntriesRef.current.value))}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
            <span> entries</span>
        </div>
    )
}

export default Entries;
