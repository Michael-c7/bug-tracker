import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

// projectTableData, projectTableIndex

const Table = (props) => {
    const {
        projectTableData, projectTableIndex,
    } = props.tableData;


    return (
        <table>
             <tbody>
                 <tr className="table-heading">
                     <th scope="col">Project Name</th>
                     <th scope="col">Description</th>
                     <th scope="col">Created</th>
                     <th scope="col">Details</th>
                 </tr>
                 {/*entries data here*/}
                 {projectTableData[projectTableIndex]?.map((project, index) => {
                     const {name, description, dateCreated, id} = project;
                     return (
                         <tr key={index}>
                             <td data-label="name">{name ? `${name.length <= 25 ? name : `${name.slice(0,25).trim()}...`}` : "N/A"}</td>
                             <td data-label="description" className='truncate-text'>{description ? description : "N/A"}</td>
                             <td data-label="date">{dateCreated ? dateCreated : "N/A"}</td>
                             <td data-label="details">
                                 <Link className="details-link" to={`/dashboard/ProjectDetails/:${id}`}>Learn More</Link>
                             </td>
                         </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
