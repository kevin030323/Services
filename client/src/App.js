import "./App.css";
import Home from "./componentes/Home/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./componentes/Landing/Landing";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import CreatePublic from "./componentes/CreatePublic/CreatePublic";
import Profile from "./componentes/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPublic" element={<CreatePublic />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
