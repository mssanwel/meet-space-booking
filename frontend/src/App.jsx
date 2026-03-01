import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RoomsPage from './pages/RoomsPage'
import MyBookingsPage from './pages/MyBookingsPage'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [username, setUsername] = useState(() => localStorage.getItem('username'))

  const login = (tok, user) => {
    localStorage.setItem('token', tok)
    localStorage.setItem('username', user)
    setToken(tok)
    setUsername(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken(null)
    setUsername(null)
  }

  return (
    <BrowserRouter>
      {token && <Navbar username={username} onLogout={logout} />}
      <Routes>
        <Route path="/login" element={!token ? <LoginPage onLogin={login} /> : <Navigate to="/rooms" />} />
        <Route path="/register" element={!token ? <RegisterPage onLogin={login} /> : <Navigate to="/rooms" />} />
        <Route path="/rooms" element={token ? <RoomsPage token={token} /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={token ? <MyBookingsPage token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? '/rooms' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}
