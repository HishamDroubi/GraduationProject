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
import ChatPage from "./pages/ChatPage";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="py-3">
          <div style={{ padding: "15px" }}>
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
                path="/chat/:receiver"
                element={
                  <Protect>
                    <ChatPage />
                  </Protect>
                }
              />
              <Route
                path="/group/:id/*"
                element={
                  <Protect>
                    <GroupDetails />
                  </Protect>
                }
              />
            </Routes>
          </div>
        </main>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
