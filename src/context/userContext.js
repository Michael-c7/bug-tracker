import React, { useState, useEffect, createContext, useContext } from 'react'
import { 
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    reload,
 } from "firebase/auth";

import { collection, addDoc, getDocs, doc, setDoc  } from "firebase/firestore"; 

import { auth, db } from "../firebase"

const UserContext = createContext({})


export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState()
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState({})
    // modals
    const [logoutModal, setLogoutModal] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    const [ticketModal, setTicketModal] = useState(false);
    // table data
    const [projectTableData, setProjectTableData] = useState([]);



    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null)
            setError("")
            setLoading(false)
        });
        return unsubscribe;
    }, [])




    const getUserInfo = () => {
        onAuthStateChanged(auth, (user) => {
        // 1. check if user is logged in / authenticated
            if(user) {
            // 2. get their info from the firestore database
                getDocs(collection(db, "users")).then((item) => {
                    item.docs.forEach((thing) => {
                        /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
                        if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === user.uid) {
                            let currentInfo = thing["_document"].data.value.mapValue.fields;
                            setUserInfo({
                                email:currentInfo.email.stringValue,
                                name:currentInfo.name.stringValue,
                                role:currentInfo.role.stringValue,
                                uid:currentInfo.uid.stringValue,
                            })
                        }
                    })
                })
            } else {
                // user is signed out
            }
        })
    }


    useEffect(() => {
        getUserInfo()
    }, [])


    

    const registerUser = (email, name, password, role) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // creating / adding the info the database
            addDoc(collection(db, "users"), {
                email,
                name,
                role,
                uid:cred.user.uid,
              }).then(res => console.log(res))
              .catch((error) => setError(error)) 
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
      };





    const signInUser = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            // getting the user info from the database
            getDocs(collection(db, "users")).then((item) => {
                item.docs.forEach((thing) => {
                    /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
                    if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === res.user.uid) {
                        let currentInfo = thing["_document"].data.value.mapValue.fields;
                        setUserInfo({
                            email:currentInfo.email.stringValue,
                            name:currentInfo.name.stringValue,
                            role:currentInfo.role.stringValue,
                            uid:currentInfo.uid.stringValue,
                        })
                    }
                })
            })
        })
        .catch(error => setError(error.message))
        .finally(setLoading(false))
    }



    const logoutUser = () => {
        signOut(auth)
    }



    const forgotPassword = email => {
        return sendPasswordResetEmail(auth, email)
    }


    /*data parameter should be an object containing
    1. project name
    2. project description
    3. team members on the project
    */
    const setProjectData = async (data) => {
        const {name, description, teamMembers, dateCreated} = data;

        // creating / adding the info the database
        addDoc(collection(db, "projects"), {
            name,
            description,
            teamMembers,
            dateCreated,

          }).then(res => console.log(res))
          .catch((error) => setError(error)) 
    }


    const getProjectData = () => {
         return getDocs(collection(db, "projects")).then((item) => {
            let projects = item.docs.map((thing) => {
                let projectInfo = thing["_document"].data.value.mapValue.fields;
                const description = projectInfo.description.stringValue;
                const name = projectInfo.name.stringValue;
                const dateCreated = projectInfo.dateCreated.stringValue;

                const teamMembers = projectInfo.teamMembers.arrayValue.values.map((item) => {
                    const name = item.mapValue.fields.name.stringValue;
                    const uid = item.mapValue.fields.uid.stringValue;
                    return {name, uid};
                });

                return {
                    name,
                    description,
                    teamMembers,
                    dateCreated,
                }
            })
            return projects;
        })
    }

    const getAllUsers = () => {
        return getDocs(collection(db, "users")).then((item) => {
            let users = item.docs.map((thing) => {
                let userInfo = thing["_document"].data.value.mapValue.fields;
                return {
                    email:userInfo.email.stringValue,
                    name:userInfo.name.stringValue,
                    role:userInfo.role.stringValue,
                    uid:userInfo.uid.stringValue,
                }
            })
            return users;
        })
    }

    const getTodaysDate = _ => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd < 10) {
            dd='0'+dd
        } 

        if(mm < 10) {
            mm='0'+mm
        } 

        return today = mm+'/'+dd+'/'+yyyy;
    }



    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
        userInfo,
        logoutModal, setLogoutModal,
        projectModal, setProjectModal,
        ticketModal, setTicketModal,
        getAllUsers,
        setProjectData, getProjectData,
        projectTableData, setProjectTableData,
        getTodaysDate,
    }



    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
