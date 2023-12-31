import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewItem() {
  const auth = localStorage.getItem("jwt");
  const navigate = useNavigate();
  // if (!auth) {
  //   navigate("/");
  // }
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const copyPass = () => {
    navigator.clipboard.writeText(userForm.password);
    toast("Copied to clipboard");
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(userForm.email);
    toast("Copied to clipboard");
  };
  const copyName = () => {
    navigator.clipboard.writeText(userForm.name);
    toast("Copied to clipboard");
  };
  let params = useParams();

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const inputHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };
  const onUpdate = (e) => {
    e.preventDefault();
    navigate("/edit-item/" + params.id);
    // console.log("http://localhost:4000/employees/update-employee/" + params.id);
    // axios
    //   .patch(
    //     "http://localhost:4000/api/item/" + params.id,
    //     {
    //       name: userForm.name,
    //       email: userForm.email,
    //       password: userForm.password,
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log({ status: res.status });
    //     navigate("/");
    //   });
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/item/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data.Item);
        setUserForm({
          name: res.data.Item.name,
          email: res.data.Item.email,
          password: res.data.Item.password,
        });
      });
  }, []);
  return (
    <div>
      <h1>View Item</h1>
      <div className="form-wrapper">
        <form className="my-5" onSubmit={onUpdate}>
          <div className="mb-3">
            <input
              type="text"
              id="form6Example3"
              className="form-control"
              name="name"
              value={userForm.name}
              onChange={inputHandler}
              disabled
            />
            <label className="form-label" for="form6Example3">
              Name
            </label>
            <label className="btn" onClick={copyName}>
              COPY
            </label>
          </div>
          <div className="mb-3">
            <input
              type="email"
              id="form6Example5"
              className="form-control"
              name="email"
              value={userForm.email}
              onChange={inputHandler}
              disabled
            />
            <label className="form-label" for="form6Example5">
              Email
            </label>
            <label className="btn" onClick={copyEmail}>
              COPY
            </label>
          </div>

          <div className="mb-3">
            <input
              type={show ? "text" : "password"}
              id="form6Example3"
              className="form-control"
              name="password"
              value={userForm.password}
              onChange={inputHandler}
              disabled
            />
            <label className="form-label" for="form6Example3">
              Password
            </label>
            <label className="btn" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </label>
            <label className="btn" onClick={copyPass}>
              COPY
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            //   onClick={console.log}
          >
            Edit
          </button>
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default ViewItem;
