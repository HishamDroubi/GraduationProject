import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Level from "./pages/Level";
import LevelDetails from "./pages/LevelDetails";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Protect from "./components/Protect";
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
              <Route
                path="/profile/:userName/*"
                element={
                  <Protect>
                    <Profile />
                  </Protect>
                }
              />
              <Route
                path="/level/:id"
                element={
                  <Protect>
                    <LevelDetails />
                  </Protect>
                }
              />
              <Route
                path="/groups/page/:pageNumber"
                element={
                  <Protect>
                    <Groups />
                  </Protect>
                }
              />
              <Route
                path="/group/:id"
                element={
                  <Protect>
                    <GroupDetails />
                  </Protect>
                }
              />
            </Routes>
          </Container>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
