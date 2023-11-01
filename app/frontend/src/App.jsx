import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import ListItem from "./pages/ListItem";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewItem from "./pages/ViewItem";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <MenuBar />
      {/* <Login /> */}
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/create-item" element={<CreateItem />}></Route>
          <Route path="/list-item" element={<ListItem />}></Route>
          <Route path="/edit-item/:id" element={<EditItem />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/view-item/:id" element={<ViewItem />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
