import React, { useRef, useState } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"

const Projects = () => {
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const amountOfEntriesRef = useRef();
    const searchTableRef = useRef();


    const { 
        projectModal, setProjectModal,
        getProjectData,
        projectTableData, setProjectTableData,
    } = useUserContext()


    // React.useEffect(() => {
    //     getProjectData().then((projects) => {
    //         setProjectTableData(projects)
    //     })
    // }, [])

    React.useEffect(() => {
        getProjectData().then((projects) => {
            let size = amountOfEntriesState;
            let arrayOfArrays = [];
            for (var i = 0; i < projects.length; i += size) {
                arrayOfArrays.push(projects.slice(i, i + size));
            }
            if(projects) {
                setProjectTableData(arrayOfArrays)
                // setProjectTableIndex(0)
                setTotalAmountEntries(projects.length)
            }
        })
    }, [amountOfEntriesState, projectTableData.length, projectTableIndex])


    const nextSlide = (stateValue, amountToChangeValue) => {
        if(projectTableIndex === projectTableData.length) {
            setProjectTableIndex(0)
        } else {
            setProjectTableIndex(setProjectTableIndex++)
        }
    }

    const prevSlide = (stateValue, amountToChangeValue) => {
        if(projectTableIndex === 0) {
            setProjectTableIndex(projectTableData.length)
        } else {
            setProjectTableIndex(setProjectTableIndex++)
        }
    }

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
                            <select name="amount-of-entries" ref={amountOfEntriesRef} onChange={() => SetAmountOfEntriesState(Number(amountOfEntriesRef.current.value))}>
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
                            <th>Details</th>
                        </tr>
                        {/*entries data here*/}
                        {projectTableData[projectTableIndex]?.map((project, index) => {
                            const {name, description, dateCreated} = project;
                            // console.log(projectTableData[projectTableIndex].length)
                            return (
                                <tr key={index}>
                                    <td>{name ? `${name.length <= 25 ? name : `${name.slice(0,25).trim()}...`}` : "N/A"}</td>
                                    <td>{description ? `${description.length <= 200 ? description : `${description.slice(0,200).trim()}...`}` : "N/A"}</td>
                                    <td>{dateCreated ? dateCreated : "N/A"}</td>
                                    <td><a href="/">Details</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/*bottom: showing entires & prev, next buttons*/}
                <div className="bottom">
                    <div>Showing 1 to {projectTableData[projectTableIndex]?.length} of {totalAmountEntries} entries</div>
                    <div className="page-btns">
                        <button onClick={() => prevSlide()}>Prev</button>
                        {projectTableData.map((item, index) => {
                            return (
                            <button key={index} onClick={() => setProjectTableIndex(index)}>{index + 1}</button>
                            )
                        })}
                        <button onClick={() => nextSlide()}>Next</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Projects
