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
import LevelDetails from "./pages/LevelDetails";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
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
              <Route path="/profile/:userName" element={<Profile />} />
              <Route path="/level/:id" element={<LevelDetails/>}/>
              <Route path="/groups" element={<Groups/>}/>
              <Route path="/group/:id" element={<GroupDetails/>}/>
            </Routes>
          </Container>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;