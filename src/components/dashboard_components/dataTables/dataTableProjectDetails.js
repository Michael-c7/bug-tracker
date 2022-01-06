import React, { useState } from 'react'
import DataTable from '../DataTable';
import { useUserContext } from '../../../context/userContext'


const DataTableProject = () => {
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    // table data
    const [projectTableData, setProjectTableData] = useState([]);

// table data source
    const [tableDataSource, setTableDataSource] = useState([])

    const { 
        getProjectData,
    } = useUserContext()

// side effect
    React.useEffect(() => {
        setTableDataSource(getProjectData);
    }, [])

    return (
        <DataTable data={
            {
                amountOfEntriesState, SetAmountOfEntriesState,
                projectTableIndex, setProjectTableIndex,
                totalAmountEntries, setTotalAmountEntries,
                searchInput, setSearchInput,
                projectTableData, setProjectTableData,
                tableDataSource,
            }}/>
    )
}

export default DataTableProject
