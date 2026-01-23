import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import ManageUsers from "./components/ManageUsers";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
