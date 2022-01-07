import React, { useState, UseEffect } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"
import { FaAngleDown } from 'react-icons/fa';
import  DataTable from "../dashboard_components/DataTable"
import { useParams } from 'react-router-dom'

import DataTableProjectDetails from './dataTables/DataTableProjectDetails';


const ProjectDetails = () => {

// 1. get the current project id 
// 2. use the project id to show the project details
    const { id } = useParams()
    const projectDetailsId = id.slice(1)


    /*
        ***
        CURRENTLY NEED A WAY TO GET THE PROJECT DETAILS DATA / OR HAVE THE DATA 
        AS A FUNCTION I CAN EXPORT OR AS AN INDEPENDENT FUNCTION
        ***
    */

// modal
    const [projectModal, setProjectModal] = useState(false)

/*assigned personal dataTable*/
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    const [projectTableData, setProjectTableData] = useState([]);


    // test
    const [teamMembers, setTeamMembers] = useState([])

/*tickets dataTable*/
// const [amountOfEntriesState2, SetAmountOfEntriesState2] = useState(10)
// let [projectTableIndex2, setProjectTableIndex2] = useState(0)
// const [totalAmountEntries2, setTotalAmountEntries2] = useState(0)
// const [searchInput2, setSearchInput2] = useState("")
// const [projectTableData2, setProjectTableData2] = useState([]);

// accordion
    const [accordionOpen, setAccordionOpen] = useState(true)
    const [accordionData, setAccordionData] = useState({})


    const accordionSetFunc = () => {
        setAccordionOpen(!accordionOpen)
        // let accordionDataEl = document.querySelector(".accordion__data").closest(".accordion-data--show");
        // if(accordionDataEl && accordionOpen) {
        //     accordionDataEl.style.maxHeight = "auto";
        // }
    }


    const { 
        getProjectData,
        getDataTableData
    } = useUserContext()

    


    React.useEffect(() => {
        getProjectData().then((projects) => {
            projects.map((obj) => {
                if(obj.id === projectDetailsId) {
                    setAccordionData(obj)
                    // the team members 
                    setProjectTableData([obj.teamMembers])
                    setTeamMembers(obj.teamMembers)
                }
            })
        })
    }, [])


    React.useEffect(() => {
        console.log(teamMembers)
    }, [teamMembers])

    let accordionName = accordionData.name ? accordionData.name : "Name N/A"
    let accordionDate = accordionData.dateCreated ? accordionData.dateCreated : "Date N/A"
    let accordionDescription = accordionData.description ? accordionData.description : " description N/A"

    return (
        <section className='projects'>
            <h2 className="dashboard__heading">Project Details ({projectDetailsId})</h2>
            <button className='btn-main spacing-box-tb-m dashboard-btn' onClick={() => setProjectModal(!projectModal)}>Edit Project</button>
            <div className="spacing-box-lr-sm">
                <div className="accordion">
                    <header className="accordion__header">
                        <h2>{accordionName}</h2>
                        <button className="close-accordion-btn" onClick={() => accordionSetFunc()}>
                            <FaAngleDown className="icon"/>
                        </button>
                    </header>
                    <div className={`${accordionOpen ? "accordion__data accordion-data--show" : "accordion__data"}`}>
                        <p className="">Created: {accordionDate}</p>
                        <p className="accordion_description">{accordionDescription}</p>
                    </div>
                </div>


                {/*assigned personal dataTable */}
                <DataTableProjectDetails data={
                    {
                        amountOfEntriesState, SetAmountOfEntriesState,
                        projectTableIndex, setProjectTableIndex,
                        totalAmountEntries, setTotalAmountEntries,
                        searchInput, setSearchInput,
                        projectTableData, setProjectTableData,
                        teamMembers,
                    }}/>
                {/*tickets dataTable */}
                {/* <DataTable data={
                    {
                        amountOfEntriesState2, SetAmountOfEntriesState2,
                        projectTableIndex2, setProjectTableIndex2,
                        totalAmountEntries2, setTotalAmountEntries2,
                        searchInput2, setSearchInput2,
                        projectTableData2, setProjectTableData2,
                    }}/> */}
            </div>
        </section>
    )
}


export default ProjectDetails;

/*
                Details
                    basic details [X]
                        - full name [X]
                        - description [X]
                        - created date [X]

                    Assigned Personal
                        - table w/ name, email & role

                    tickets for this project
                        - table w/ ticket info
*/