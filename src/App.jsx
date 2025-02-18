
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminpage.jsx'
import HomePage from './pages/home/homePage.jsx'
import LoginPage from './pages/login/login.jsx'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <BrowserRouter>
    <Toaster/>  {/* react toast allet pennanna ona nisa */}

      <Routes path="/*">
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>

      </Routes>
    </BrowserRouter>

  ) 
}

export default App