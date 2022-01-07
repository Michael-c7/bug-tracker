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

import useSetDataTableProjects from "./setDataTable/useSetDataTableProjects"


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
        tableDataSource,
        } = props.data;

    // refs
    const amountOfEntriesRef = useRef();
    const searchTableRef = useRef();

    const { 
        getProjectData,
        subdivideArray,
        searchTable,
        sortByDate,
        // setUpTableData,
    } = useUserContext()



    const setUpTableData = (items, arrayOfArrays, setTotalAmountEntries,searchInput,setProjectTableIndex) => {
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

// SideEffects
    // useSetDataTableProjects(
    //     [
    //         amountOfEntriesState,
    //         projectTableData.length,
    //         projectTableIndex,
    //         searchInput,
    //         setTotalAmountEntries
    // ]);

    const checkIfPromise = (args) => {
        if(typeof args === 'object' && typeof args.then === 'function') return true;
        return false;
    }


    const handleTableData = (tableData) => {
        if(tableData) {
            if(tableData instanceof Function) {
                return tableData().then(projects => projects);
            } else if(Array.isArray(tableData)) {
                return tableData;
            } else if(typeof tableData === 'object' && tableData !== null) {
                return [tableData]
            } else {
                return []
            }
        }
    }

    React.useEffect(() => {
        // getProjectData().then((projects) => {
        //     setUpTableData(projects, subdivideArray(projects, amountOfEntriesState, sortByDate),setTotalAmountEntries, searchInput, setProjectTableIndex);
        // })

        if(checkIfPromise(handleTableData(getProjectData))) {
            let data = handleTableData(getProjectData)
            data.then((items) => {
                setUpTableData(items, subdivideArray(items, amountOfEntriesState, sortByDate),setTotalAmountEntries, searchInput, setProjectTableIndex);
            })
        } else {
            let data = handleTableData(getProjectData)
            setUpTableData(data, subdivideArray(data, amountOfEntriesState, sortByDate),setTotalAmountEntries, searchInput, setProjectTableIndex);
        }
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
                    tableDataSource,
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
