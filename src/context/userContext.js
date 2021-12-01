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

import { collection, addDoc, getDocs  } from "firebase/firestore"; 

import { auth, db } from "../firebase"

const UserContext = createContext({})


export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState()
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState({})



    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null)
            setError("")
            setLoading(false)
        })

        return unsubscribe;
    }, [])




    const getUserInfo = () => {
        onAuthStateChanged(auth, (user) => {
        // 1. check if user is logged in / authenticated
            if(user) {
            // 2. get their info from the firestore database
                console.log("user is logged in")

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
                        console.log(currentInfo)
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



    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
        userInfo,
    }



    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
