import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import ListItem from "./pages/ListItem";

function App() {
  return (
    <div>
      <MenuBar />
      <div>
        <Routes>
          <Route path="/" element={<ListItem />}></Route>
          <Route path="/create-item" element={<CreateItem />}></Route>
          <Route path="/list-item" element={<ListItem />}></Route>
          <Route path="/edit-item/:id" element={<EditItem />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
