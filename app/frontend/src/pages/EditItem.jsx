import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  let params = useParams();
  let navigate = useNavigate();
  const inputHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };
  const onUpdate = (e) => {
    e.preventDefault();
    // console.log("http://localhost:4000/employees/update-employee/" + params.id);
    axios
      .put("http://localhost:4000/employees/update-employee/" + params.id, {
        name: userForm.name,
        email: userForm.email,
        empno: userForm.password,
      })
      .then((res) => {
        console.log({ status: res.status });
        navigate("/list-employee");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/items/get-item/" + params.id)
      .then((res) => {
        setUserForm({
          name: res.data.data.name,
          email: res.data.data.email,
          empno: res.data.data.password,
        });
      });
  }, []);
  return (
    <div>
      <h1>Edit Item</h1>
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
            />
            <label className="form-label" for="form6Example3">
              Name
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
            />
            <label className="form-label" for="form6Example5">
              Email
            </label>
          </div>

          <div className="mb-3">
            <input
              type="text"
              id="form6Example3"
              className="form-control"
              name="password"
              value={userForm.password}
              onChange={inputHandler}
            />
            <label className="form-label" for="form6Example3">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            //   onClick={console.log}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
