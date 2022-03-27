import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import CreateLevelForm from "./pages/CreateLevelForm";
import Profile from "./pages/Profile";
import Level from "./pages/Level";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Level />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/level/create" element={<CreateLevelForm />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;