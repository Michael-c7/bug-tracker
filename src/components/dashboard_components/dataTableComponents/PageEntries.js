import React from 'react'

// projectTableData, projectTableIndex, totalAmountEntries

const PageEntries = (props) => {
    const {
        projectTableData,
        projectTableIndex,
        totalAmountEntries
    } = props.pageEntriesData;

    return (
        <div>Showing 1 to {projectTableData[projectTableIndex]?.length} of {totalAmountEntries} entries</div>
    )
}

export default PageEntries
