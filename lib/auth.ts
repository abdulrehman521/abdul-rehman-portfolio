// "use client"

// import { useState, useEffect } from "react"

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   useEffect(() => {
//     const checkAuth = () => {
//       const isAuth = sessionStorage.getItem("filmAdminAuth")
//       setIsAuthenticated(!!isAuth)
//     }
//     checkAuth()
//   }, [])

//   const login = (username: string, password: string) => {
//     if (username === "abdulrehman" && password === "abdulrehman") {
//       setIsAuthenticated(true)
//       sessionStorage.setItem("filmAdminAuth", "true")
//       return true
//     }
//     return false
//   }

//   const logout = () => {
//     setIsAuthenticated(false)
//     sessionStorage.removeItem("filmAdminAuth")
//   }

//   return { isAuthenticated, login, logout }
// }


"use client"

import { useState, useEffect } from "react"

// Film management authentication
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("film_authenticated")
    setIsAuthenticated(authStatus === "true")
  }, [])

  const login = (username: string, password: string): boolean => {
    if (username === "abdulrehman" && password === "abdulrehman") {
      localStorage.setItem("film_authenticated", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("film_authenticated")
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}

// Admin dashboard authentication (separate from film management)
export const useAdminAuth = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const adminAuthStatus = localStorage.getItem("admin_authenticated")
      setIsAdminAuthenticated(adminAuthStatus === "true")
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const adminLogin = (username: string, password: string): boolean => {
    if (username === "abdulrehman" && password === "abdulrehman") {
      localStorage.setItem("admin_authenticated", "true")
      setIsAdminAuthenticated(true)
      return true
    }
    return false
  }

  const adminLogout = () => {
    localStorage.removeItem("admin_authenticated")
    setIsAdminAuthenticated(false)
  }

  return {
    isAdminAuthenticated,
    isLoading,
    adminLogin,
    adminLogout,
  }
}
