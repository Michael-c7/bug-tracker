import React from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"

const Projects = () => {
    const { projectModal, setProjectModal, getProjectData } = useUserContext()


    React.useEffect(() => {
        getProjectData()
    }, [])

    return (
        <section className='projects'>
            <h2 className="dashboard__heading">Projects</h2>
            <button className='btn-main spacing-box-tb-m' onClick={() => setProjectModal(!projectModal)}>Create a Project</button>
            <section className="dashboard-table">
                {/*top: # of entries filter & search input*/}
                <div className="top">
                    <div className="entries">
                        <span>Show </span> 
                        <label>
                            <select name="amount-of-entries">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                        <span> entries</span>
                    </div>
                    <div>
                        <label htmlFor="search-table">Search: </label>
                        <input type="search"/>
                    </div>
                </div>
                {/*middle: the table*/}
                <table>
                    <tbody>
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                        {/*entries data here*/}
                        <tr>
                            <td>project 12</td>
                            <td>another  description</td>
                            <td>Feb 24 2019</td>
                            <td><a href="/">Details</a></td>
                        </tr>
                        <tr>
                            <td>my project xyz</td>
                            <td>a longer test description</td>
                            <td>Apr 15, 2020</td>
                            <td><a href="/">Details</a></td>
                        </tr>
                        <tr>
                            <td>the 3rd test project</td>
                            <td>a longer test description 3</td>
                            <td>Jan 17, 2021</td>
                            <td><a href="/">Details</a></td>
                        </tr>
                    </tbody>
                </table>


                {/*bottom: showing entires & prev, next buttons*/}
                <div className="bottom">
                    <div>Showing 1 to 4 of 4 entries</div>
                    <div className="page-btns">
                        <button>Prev</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>Next</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Projects
