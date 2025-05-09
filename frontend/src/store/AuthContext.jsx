import axios from "axios";
import {  createContext, useEffect, useState,  } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(false);

   const logout = async () => {
      try {
         await axios.post('/api/auth/logout')
         setUser(null)
         toast.success("Logged out successfullt")
      }
      catch (error) {
         console.error('Error logging out:', error);
      }
   }

   useEffect(() => {
      console.log("UserContext mounted")
      fetchUser();
   }, []);

   const fetchUser = async () => {
      try {

         const response = await axios.get('/api/auth/me', {withCredentials: true});
         console.log("User in context", response.data)
         setUser(response.data);
      } catch (error) {
         console.error('Error fetching user:', error);
      }
   }

   return(
      <UserContext.Provider value={{user,setUser,logout,setLoading,loading}}>
         {children}
      </UserContext.Provider>
   )
}