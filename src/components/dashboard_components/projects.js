import React, { useRef, useState } from 'react'
import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const Projects = () => {
    const [amountOfEntriesState, SetAmountOfEntriesState] = useState(10)
    let [projectTableIndex, setProjectTableIndex] = useState(0)
    const [totalAmountEntries, setTotalAmountEntries] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    // refs
    const amountOfEntriesRef = useRef();
    const searchTableRef = useRef();

    const { 
        projectModal, setProjectModal,
        getProjectData,
        projectTableData, setProjectTableData,
        nextSlide, prevSlide,
    } = useUserContext()


    React.useEffect(() => {
        getProjectData().then((projects) => {
        /*sub-divide the original array into multiple arrays
        based on how many entires the user wants to show*/
            let size = amountOfEntriesState;
            let arrayOfArrays = [];
            for (var i = 0; i < projects.length; i += size) {
                arrayOfArrays.push(sortByDate(projects).reverse().slice(i, i + size));
            }
        
            if(projects) {
                setTotalAmountEntries(projects.length)
            // search for stuff from the search bar
                if(searchInput.length >= 1) {
                    setProjectTableData([searchTable(searchInput, projects)])
                } else {
            // dont
                    setProjectTableData(arrayOfArrays)
                }

                sortByDate(projects)
            }
            
            if(projectTableData.length <= 1) {
                setProjectTableIndex(0)
            }

        })
    }, [amountOfEntriesState, projectTableData.length, projectTableIndex, searchInput])
    

    const searchTable = (usersSearch, tableData) => {
        const filteredData = [];
        for(let i = 0; i < tableData.length; i++) {
            usersSearch = usersSearch.toLowerCase();
            // vars
            let name = tableData[i].name.toLowerCase();
            let description = tableData[i].description.toLowerCase();
            let date = tableData[i].dateCreated.toLowerCase(); 

            if(name.includes(usersSearch) 
               || description.includes(usersSearch)
               || date.includes(usersSearch)) {
                filteredData.push(tableData[i])
            }
        }
        return filteredData;
    }

/*data args : an array of objects w/ a custom date property formatted like: 12/23/2021*/
    const sortByDate = (data) => {
        const arrSorted = data.sort(function(a, b) {
            /*Convert the date to a single number
            eg:  12 + 27 + 2021 = 2060*/
            let aNum = a.dateCreated.split("/").reduce((total, num) => Number(total) + Number(num));
            let bNum = b.dateCreated.split("/").reduce((total, num) => Number(total) + Number(num));
            return aNum - bNum;
          });
        return arrSorted;
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
                        
                        <div className="search">
                            <label htmlFor="search-input-table">Search:  </label>
                            <input className="search-input-text" id="search-input-table" type="search" placeholder="Search..." ref={searchTableRef} onChange={() => setSearchInput(searchTableRef.current.value)}/>
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
                        <button onClick={() => prevSlide(projectTableIndex, setProjectTableIndex, projectTableData)}>Prev</button>
                        {projectTableData.map((item, index) => {
                            return (
                            <button className={`${projectTableIndex === index ? "show-page-btn" : ""}`} key={index} onClick={() => setProjectTableIndex(index)}>{index + 1}</button>
                            )
                        })}
                        <button onClick={() => nextSlide(projectTableIndex, setProjectTableIndex, projectTableData)}>Next</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Projects;
