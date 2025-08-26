import { createContext, useState,useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";


 const AppContent=createContext()

export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials =true;
    
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const[isLoggedin,setIsLoggedin]=useState(false)
    const[userData,setUserData]=useState(false)

   

    const getAuthState = async () => {
          try {
                const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true });
                    if (data.success) {
                       setIsLoggedin(true);
                       await getUserData();
                     } else {
                      setIsLoggedin(false);
                     }
                } catch (error) {
                    console.error(error.response?.data || error.message);
                    setIsLoggedin(false);
                  }
        };

    const getUserData=async ()=>{
        try {
            const{data} =await axios.get(backendUrl+ '/api/user/data')
            data.success? setUserData(data.userData):toast.error(data.message)
        } catch (error) {
            // toast.error(error.message)
            console.error(error.response?.data || error.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData
    }
    
    return (
       <AppContent.Provider value={value}>
        {props.children}
       </AppContent.Provider>
    )
}

export default  AppContent;












