import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

// Create the context
export const userDataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState("")
  const { serverUrl } = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      })
      setUserData(result.data)
      console.log("Current User:", result.data)
    } catch (error) {
      setUserData(null)
      console.error("Error fetching current user:", error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  }

  // ✅ Removed unnecessary <div>
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
