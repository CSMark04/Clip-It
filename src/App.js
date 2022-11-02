import React, { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate, BrowserRouter } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Container/Login'
import Signup from './Container/Signup'
import { fetchUser, userAccessToken } from './utils/fetchUser'
import  AuthContextProvider  from './AuthProvider'


const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = userAccessToken()
    if (!accessToken) {
      navigate('/login', { replace: true })
    } else {
      const [userInfo] = fetchUser()
      setUser(userInfo)
    }
  }, [])

  return (
    <AuthContextProvider>
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='/*' element={<Home user={user} />} />
    </Routes>
    </AuthContextProvider>
  )
}

export default App