import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Employees from "../pages/Employees";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}

export default AppRoutes;
