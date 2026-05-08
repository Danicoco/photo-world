import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PhotographerProfile from "./pages/PhotographerProfile";
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photographer/:id" element={<PhotographerProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
