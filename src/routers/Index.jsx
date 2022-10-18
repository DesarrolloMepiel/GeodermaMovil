import { Routes, Route, useNavigate } from "react-router-dom";

// Login
import Login from "../pages/Login/Index";

// NotFound
import NotFound from "../pages/notFound/Index";

// User interface
import MainPanel from "../pages/panel/Index";

// Scanner
import Scan from "../pages/panel/Scan";


const Router = () => {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route  path="/panel">
          <Route path="/panel/petition" element={<MainPanel />} />
          <Route path="/panel/scan" element={<Scan />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
