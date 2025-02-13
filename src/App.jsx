
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminpage.jsx'
import HomePage from './pages/home/homePage.jsx'
import LoginPage from './pages/login/login.jsx'


function App() {


  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>

      </Routes>
    </BrowserRouter>

  ) 
}

export default App