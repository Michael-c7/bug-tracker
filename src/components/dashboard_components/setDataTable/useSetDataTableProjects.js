import React, {useEffect} from 'react'
import { useUserContext } from '../../../context/userContext'



// getProjectData(), 
const useSetDataTableProjects = (arrayOfDependencies) => {
    const { 
        getProjectData,
        subdivideArray,
        searchTable,
        sortByDate,
        setUpTableData,
        setProjectTableIndex,
    } = useUserContext()

    const [
        amountOfEntriesState,
        projectTableDataLength,
        projectTableIndex,
        searchInput,
        setTotalAmountEntries,
    ] = arrayOfDependencies;



    useEffect(() => {
        getProjectData().then((projects) => {
            setUpTableData(projects, subdivideArray(projects, amountOfEntriesState, sortByDate),setTotalAmountEntries, searchInput, setProjectTableIndex);
        })
    }, [amountOfEntriesState, projectTableDataLength, projectTableIndex, searchInput])

}

export default useSetDataTableProjects;
