
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminpage.jsx'
import HomePage from './pages/home/homePage.jsx'
import LoginPage from './pages/login/login.jsx'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/Register/registerPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import VerifyEmail from './pages/verifyEmail/verifyEmail.jsx'



function App() {


  return (
    <GoogleOAuthProvider clientId="124973146763-ittb8km299j5ebrirb0o6ismkupu0f5g.apps.googleusercontent.com" >
    <BrowserRouter>
    <Toaster position='top-right'/>  {/* react toast allet pennanna ona nisa */}

      <Routes path="/*">
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/*" element={<HomePage/>}/>

      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>

  ) 
}

export default App