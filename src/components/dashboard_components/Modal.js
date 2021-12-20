import React, { useRef } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { auth, db } from "../../firebase"
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/modal.scss"


const Modal = () => {
    let [users, setUsers] = React.useState([])
    let [selectOptions, setSelectOptions] = React.useState([])
    let nameRef = useRef()
    let descriptionRef = useRef()
    const teamMembersRef = useRef()

    const { 
        projectModal, setProjectModal,
        getAllUsers, setProjectData,
        getTodaysDate,
        getProjectData,
        setProjectTableData,
    } = useUserContext()

    const closeModal = e => {
        e.preventDefault()
        if (e.target.closest(".modal__close-btn") ||
            !e.target.closest(".modal")) {
            setProjectModal(false)
          }
    }
    
    const submitModal = () => {
        const createProjectData = {
            name:nameRef.current.value,
            description:descriptionRef.current.value,
            teamMembers:selectOptions.multiValue.map(str => JSON.parse(str)),
            dateCreated:getTodaysDate(),
        }
        setProjectData(createProjectData)
        // console.log(createProjectData)

        // close modal
        setProjectModal(false)

        // clear the inputs
        nameRef.current.value = "";
        descriptionRef.current.value = "";

        // get the projects data
        getProjectData().then((projects) => {
            setProjectTableData(projects)
        })
        
    }

    // const closeModal = (event, buttonClass, modalClass, closeState) => {
    //     if (event.target.closest(buttonClass) ||
    //         !event.target.closest(modalClass)) {
    //             closeState(false)
    //       }
    // }  
    React.useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
        })
    }, [])


    const getTeamMembers = (e) => {
        setSelectOptions({multiValue: [...e.target.selectedOptions].map(o => o.value)}); 
    }
 
    return (
        <section className={`modal-container ${projectModal ? "show" : "hide"}`} onClick={closeModal}>
            <form className="form-container center-transform modal" onClick={closeModal}>
                <button className="modal__close-btn"><FaTimes/></button>
                <h2 className="modal__heading">Create Project</h2>
                <div className="modal-input-container">
                    <label className="modal__label" htmlFor="project-name">Project Name</label>
                    <input className="modal__input" id="project-name" name="project-name" type="text" placeholder="Enter Project Name" ref={nameRef}/>
                    <label className="modal__label" htmlFor="project-description">Project Description</label>
                    <textarea className="modal__input modal-description" id="project-description" name="project-description" type="text" placeholder="Enter Project Description" ref={descriptionRef}/>

                    <label className="modal__label" htmlFor="team-members">Add Team Members</label>
                    <select className="modal__input modal-select" name="team-members" id="team-members" multiple ref={teamMembersRef} onChange={getTeamMembers}>
                        {users.map((user, index) => {
                            return (
                                <option value={JSON.stringify({name:user.name,uid:user.uid})} key={index}>{user.name} ({user.email})</option>
                            )
                        })}
                    </select>
                </div>

                <button className="btn-main modal-create-project-btn" type="submit" onClick={submitModal}>Create Project</button>
            </form>
        </section>
    )
}

export default Modal;
