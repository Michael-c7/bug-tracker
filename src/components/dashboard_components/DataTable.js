import React, { useRef, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

import { useUserContext } from '../../context/userContext'
import "../../styles/dashboard_styles/table.scss"
import "../../styles/components.scss"

import Loading from "../Loading"


// dataTable comp
import Entries from "./dataTableComponents/Entries"
import Search from "./dataTableComponents/Search"
import PageEntries from './dataTableComponents/PageEntries';
import PageButtons from './dataTableComponents/PageButtons';
import Table from './dataTableComponents/Table';

const DataTable = (props) => {
    const {
        amountOfEntriesState, SetAmountOfEntriesState,
        projectTableIndex, setProjectTableIndex,
        totalAmountEntries, setTotalAmountEntries,
        searchInput, setSearchInput,
        projectTableData, setProjectTableData,
        tableDataVar
        } = props.data;

    // refs
    const amountOfEntriesRef = useRef();
    const searchTableRef = useRef();

    const { 
        getProjectData, getDataTableData,
    } = useUserContext()





    /*items: array of objects
    amountOfEntriesState: number (a state value)
    sortByDate: function
     */
    const subdivideArray = (items, amountOfEntriesState, sortByDate) => {
        /*sub-divide the original array into multiple arrays
        based on how many entires the user wants to show*/
        if(items) {
            let size = amountOfEntriesState;
            let arrayOfArrays = [];
            for (var i = 0; i < items.length; i += size) {
                arrayOfArrays.push(sortByDate(items).reverse().slice(i, i + size));
            }
            return arrayOfArrays;
        } else {
            return [];
        }
       
    }
    /*items: array of objects
     arrayOfArrays: array of arrays w/ objects in them
     setTotalAmountEntries: the set state value for totalAmountEntries which is a number
     setProjectTableData: 
     */
    const setUpTableData = (items, arrayOfArrays, setTotalAmountEntries) => {
        if(items) {
            setTotalAmountEntries(items.length)
        // search for stuff from the search bar
            if(searchInput.length >= 1) {
                setProjectTableData([searchTable(searchInput, items)])
            } else {
        // dont
                setProjectTableData(arrayOfArrays)
            }
            sortByDate(items)
        }
        
        if(projectTableData.length <= 1) {
            setProjectTableIndex(0)
        }
    }    
    

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


    



// SideEffects
    React.useEffect(() => {
        getProjectData().then((projects) => {
            // if(tableDataVar === "project")

            // console.log(projects[0].id)
            setUpTableData(projects, subdivideArray(projects, amountOfEntriesState, sortByDate), setTotalAmountEntries);

        })
    }, [amountOfEntriesState, projectTableData.length, projectTableIndex, searchInput])


    return (
        <section className="dashboard-table">
                {/*top: # of entries filter & search input*/}
                <div className="top">
                    <Entries entriesData={{
                        amountOfEntriesRef,
                        SetAmountOfEntriesState
                    }}/>
                        
                    <Search searchData={{
                        searchTableRef,
                        setSearchInput
                    }}/>
                </div>
                {/*middle: the table*/}
                <Table tableData={{
                    projectTableData, projectTableIndex,
                }}/>
                {/*bottom: showing entires & prev, next buttons*/}
                <div className="bottom">
                    <PageEntries pageEntriesData={{
                        projectTableData,
                        projectTableIndex,
                        totalAmountEntries,
                    }}/>
                    <PageButtons pageButtonsData={{
                        projectTableData,
                        projectTableIndex, setProjectTableIndex,
                    }}/>
                </div>
        </section>
    )
}

export default DataTable
