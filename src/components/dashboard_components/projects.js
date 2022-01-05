import React, { useRef, useState } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"
import Loading from "../Loading"


import DataTable from './DataTable';


const Projects = () => {
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    // table data
    const [projectTableData, setProjectTableData] = useState([]);


    const { 
        projectModal, setProjectModal,
        getProjectData, getDataTableData,
    } = useUserContext()
    
    let tableDataVar = _ => getDataTableData("project")



    return (
        <section className='projects'>
            <h2 className="dashboard__heading">Projects</h2>
            <button className='btn-main spacing-box-tb-m dashboard-btn' onClick={() => setProjectModal(!projectModal)}>Create a Project</button>
            <DataTable data={
                {
                    amountOfEntriesState, SetAmountOfEntriesState,
                    projectTableIndex, setProjectTableIndex,
                    totalAmountEntries, setTotalAmountEntries,
                    searchInput, setSearchInput,
                    projectTableData, setProjectTableData,
                    tableDataVar,
                }}/>
        </section>
    )
}

export default Projects;
