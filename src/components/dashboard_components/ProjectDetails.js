import React from 'react'
import { useParams } from 'react-router-dom'
// 1. get the current project id 
// 2. use the project id to show the project details

const ProjectDetails = () => {
    const { id } = useParams()
    const projectDetailsId = id.slice(1)


    return (
        <div>
            
            <h2>Project Details ID --> {projectDetailsId}</h2>
        </div>
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