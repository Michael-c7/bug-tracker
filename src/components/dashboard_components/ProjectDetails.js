import React, { useState, UseEffect } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"
import { useParams } from 'react-router-dom'
// 1. get the current project id 
// 2. use the project id to show the project details

const ProjectDetails = () => {
    const { id } = useParams()
    const projectDetailsId = id.slice(1)

    // modal
    const [projectModal, setProjectModal] = useState(false)

    // project
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    // table data
    const [projectTableData, setProjectTableData] = useState([]);
    // project details




    const { 
        getProjectData,
    } = useUserContext()

    React.useEffect(() => {
        getProjectData().then((projects) => {
            projects.map((obj) => {
                if(obj.id === projectDetailsId) {
                    setProjectTableData(obj)
                    console.log(obj)
                }
            })
            
            
        })
    }, [])

    return (
        <section className='projects'>
            <h2 className="dashboard__heading">Project Details ({projectDetailsId})</h2>
            <button className='btn-main spacing-box-tb-m dashboard-btn' onClick={() => setProjectModal(!projectModal)}>Edit Project</button>

            <div className="">
                <h2>Details</h2>
                <p>{projectTableData.name}</p>
                <p>{projectTableData.description}</p>
                <p>Created: {projectTableData.dateCreated}</p>
            </div>
        </section>
    )
}


export default ProjectDetails;

/*
                Details
                    basic details
                        - full name
                        - description
                        - created date

                    Assigned Personal
                        - table w/ name, email & role

                    tickets for this project
                        - table w/ ticket info
*/