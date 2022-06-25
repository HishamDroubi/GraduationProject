import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import Level from "./pages/Level";
import LevelDetails from "./pages/LevelDetails";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Protect from "./components/Protect";
import ChatPage from "./pages/ChatPage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { socketInstance } from "./socket";

import {
  fetchChats,
  getMessage,
  addNotification,
  fetchNotifications,
} from "./features/chat/chatsSlice";
import { selectedChatCompare } from "./features/chat/chatsSlice";
import ResetPassword from "./pages/ResetPassword";
import {
  fetchNewInvetation,
  deleteTheInvitation,
} from "./features/auth/authSlice";
import BottomAppBar from "./components/BottomAppBar";
import Blog from "./Blog";
const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      socketInstance.io.emit("setup", user);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      socketInstance.io.on("message recieved", async (newMessageRecieved) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          await dispatch(addNotification(newMessageRecieved._id));
        } else {
          dispatch(getMessage(newMessageRecieved));
        }
        await dispatch(fetchChats());
      });
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      socketInstance.io.on("invitation recieved", (newInvitation) => {
        dispatch(fetchNewInvetation(newInvitation));
      });
      socketInstance.io.on("invitation canceled", (canceldInvitation) => {
        dispatch(deleteTheInvitation(canceldInvitation));
      });
    }
  }, [user, dispatch]);
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="py-3" >
          <div style={{ padding: "15px" }}>
            <Routes>
              <Route path="/" element={<Level />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog" element={<Blog title="Title"/>} />
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
                path="/chat"
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
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
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
