import React, { useRef, useState } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"
import Loading from "../Loading"


import DataTable from './DataTable';
// dataTable
import DataTableProject from "../../components/dashboard_components/dataTables/DataTableProject"



const Projects = () => {
    const { 
        projectModal, setProjectModal,
        getProjectData, getDataTableData,
    } = useUserContext()



    return (
        <section className='projects'>
            <h2 className="dashboard__heading">Projects</h2>
            <button className='btn-main spacing-box-tb-m dashboard-btn' onClick={() => setProjectModal(!projectModal)}>Create a Project</button>
            <DataTableProject/>
        </section>
    )
}

export default Projects;



/*

// in project / projectDetails, ect...
    const [dataValue, setDataValue] = useState("")

    // pass dataValue to the dataTable component

// in DataTable
    // A function to figure out if the pass var is a function,

    const handleTableData = (tableData) => {
        if(tableData) {
            if(tableData typeof === function) {
                tableData().then((projects) => {
                    return projects
                })

                return tableData
            } else if(tableData type === array) {
                return tableData
            } else if(tableData typeof === object) {
                return [tableData]
            } else {
                // throw error did not pass a value type of value into handleTableData
                return []
            }
        }
    }

    1. if a  function get the data,
    then return as an array

    2. if an array return data

    3. if ann obj return data wrapped in an array [data]

    React.useEffect(() => {
        setUpTableData(tableData, subdivideArray(tableData, amountOfEntriesState, sortByDate),setTotalAmountEntries, searchInput, setProjectTableIndex);
    }, [amountOfEntriesState, projectTableData.length, projectTableIndex, searchInput])
*/