import MainPage from "../pages/main"
import { HashRouter, Route, Routes } from 'react-router-dom';



const RouteContainer = () => {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  </HashRouter>
}


export default RouteContainer;
