import LoginPage from "../pages/login"
import MainPage from "../pages/main"
import { HashRouter, Route, Routes } from 'react-router-dom';



const RouteContainer = () => {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
    </Routes>
  </HashRouter>
}


export default RouteContainer;
