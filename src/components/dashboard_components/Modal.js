import React from 'react'
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/modal.scss"


const Modal = () => {
    const { projectModal, setProjectModal } = useUserContext()

    const closeModal = e => {
        if (e.target.closest(".modal__close-btn") ||
            !e.target.closest(".modal")) {
            setProjectModal(false)
          }
    }

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
                    <select className="modal__input" name="team-members" id="team-members" multiple>
                        <option value="john smith">john smith</option>
                        <option value="aamir khan ">aamir khan </option>
                        <option value="fatima ali">fatima ali</option>
                        <option value="steve baker">steve baker</option>
                    </select>
                </div>

                <button className="btn-main modal-create-project-btn" type="submit">Create Project</button>
            </form>
        </section>
    )
}

export default Modal;
