import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ListItem() {
  const auth = localStorage.getItem("jwt");
  const navigate = useNavigate();
  // if (!auth) {
  //   navigate("/");
  // }
  const [userForm, setUserForm] = useState([]);
  // console.log(userForm);
  const deleteEmployee = (_id) => {
    console.log(_id);
    axios
      .delete("http://localhost:4000/api/item/delete-item/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log("Data successfully added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/item/item-list`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        // console.log(res.data.items);
        setUserForm(res.data.items);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  });
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Password</th> */}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userForm.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.password}</td> */}
                <td>
                  <Link
                    className="btn btn-primary btn-sm me-2"
                    to={"/view-item/" + user._id}
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm me-2"
                    to={"/edit-item/" + user._id}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteEmployee(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListItem;
