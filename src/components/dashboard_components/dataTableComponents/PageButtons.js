import React from 'react'

// projectTableData,   prevSlide, nextSlide projectTableIndex, setProjectTableIndex, projectTableData, setProjectTableIndex

// projectTableIndex, setProjectTableIndex, projectTableData
const nextSlide = (indexState, setIndexState , tableData) => {
    if(indexState === tableData.length - 1) {
        setIndexState(0)
    } else {
        setIndexState(indexState + 1)
    }
}
// projectTableIndex, setProjectTableIndex, projectTableData
const prevSlide = (indexState, setIndexState , tableData) => {
    if(indexState === 0) {
        setIndexState(tableData.length - 1)
    } else {
        setIndexState(indexState - 1)
    }
}


const PageButtons = (props) => {
    const {
        projectTableData,
        projectTableIndex, setProjectTableIndex,
    } = props.pageButtonsData;

    return (
        <div className="page-btns">
            <button onClick={() => prevSlide(projectTableIndex, setProjectTableIndex, projectTableData)}>Prev</button>
            {projectTableData.map((item, index) => {
                return (
                     <button className={`${projectTableIndex === index ? "show-page-btn" : ""}`} key={index} onClick={() => setProjectTableIndex(index)}>{index + 1}</button>
                )
            })}
            <button onClick={() => nextSlide(projectTableIndex, setProjectTableIndex, projectTableData)}>Next</button>
        </div>
    )
}

export default PageButtons;
