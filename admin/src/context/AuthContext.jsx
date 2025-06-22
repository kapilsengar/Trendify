import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
    let serverUrl = "https://trendify-backend-q8v4.onrender.com"

    let value = {
      serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext
