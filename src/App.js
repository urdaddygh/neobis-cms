import { Route, Routes } from "react-router-dom";
import "./app_globul.css"
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/main/MainPage";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className='container'>
        <Routes>
          <Route path='/*' element={<Auth />} /> 
          <Route path='/register/*' element={<Register />} /> 
          <Route path='/main/*' element={<MainPage />} /> 
          <Route path='/profile/*' element={<Profile />} /> 
        </Routes>
    </div>
  );
}

export default App;
