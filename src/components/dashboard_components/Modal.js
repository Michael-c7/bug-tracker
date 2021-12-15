import React, { useRef } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { auth, db } from "../../firebase"
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/modal.scss"


const Modal = () => {
    let [users, setUsers] = React.useState([])
    let [userOptions, setUserOptions] = []
    const nameRef = useRef()
    const descriptionRef = useRef()
    const teamMembersRef = useRef()

    const { projectModal, setProjectModal, getAllUsers } = useUserContext()

    const closeModal = e => {
        if (e.target.closest(".modal__close-btn") ||
            !e.target.closest(".modal")) {
            setProjectModal(false)
          }
    }

    // const closeModal = (event, btnClass, modalClass, closeState) => {
    //     if (event.target.closest(btnClass) ||
    //         !event.target.closest(modalClass)) {
    //             closeState(false)
    //       }
    // }

    

    React.useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
        })
    }, [])

    React.useEffect(() => {
        console.log(users)
        const x = users.map((user) => {
            return user.name
        })
        console.log(x)
        document.querySelector(".modal-select").innerHTML += <option value="john smith">john smith</option>
    }, [users])

    // <option value="aamir khan ">aamir khan </option>

    return (
        <section className={`modal-container ${projectModal ? "show" : "hide"}`} onClick={closeModal}>
            <form className="form-container center-transform modal" onClick={closeModal}>
                <button className="modal__close-btn"><FaTimes/></button>
                <h2 className="modal__heading">Create Project</h2>
                <div className="modal-input-container">
                    <label className="modal__label" htmlFor="project-name">Project Name</label>
                    <input className="modal__input" id="project-name" name="project-name" type="text" placeholder="Enter Project Name" required autoFocus/>

                    <label className="modal__label" htmlFor="project-description">Last Name</label>
                    <textarea className="modal__input" id="project-description" name="project-description" type="text" placeholder="Enter Project Description" required/>

                    <label className="modal__label" htmlFor="team-members">Add Team Members</label>
                    <select className="modal__input modal-select" name="team-members" id="team-members" multiple required>
                        {/* <option value="john smith">john smith</option> */}
                        {/* {users ? `${users.map((user) => {
                            const {email, name, role, uid} = user;
                            console.log(user)
                            return <option value={uid}>{name}</option>
                        })}` :  <option value="no value">no value</option>} */}
                        {/* {users ? {} : ""} */}
                        {/* <option value="john smith">john smith</option> */}

                    </select>
                </div>

                <button className="btn-main modal-create-project-btn" type="submit">Create Project</button>
            </form>
        </section>
    )
}

export default Modal;
