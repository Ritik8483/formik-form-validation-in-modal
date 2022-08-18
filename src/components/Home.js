import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  deleteEmployee,
  getAllEmployee,
  resetDetails,
  singleEmployeeData,
} from "../slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    dispatch(getAllEmployee());
  }, []);

  const notifyToast = () => toast("Employee deleted successfully!");

  const employeeData = useSelector((state) => state.employeeReducer.employees);
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    setTimeout(() => {
      dispatch(getAllEmployee());
      notifyToast();
    }, 500);
  };
  const userData = useSelector((state) => state.employeeReducer.singleEmployee);
  const employeeDetail = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
  console.log("employeeDetail", employeeDetail);

  const handleEdit = (id) => {
    setAddModal(true);
    dispatch(singleEmployeeData(id));
  };
  const handleView=(id)=>{
    dispatch(singleEmployeeData(id));
    navigate(`view/${id}`);
  }

  return (
    <div>
      <div className="my-4 d-flex justify-content-center ">
        <Button onClick={() => setAddModal(true)} variant="outline-primary">
          Add User
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((data, index) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                className="cursor-pointer"
                onClick={() => handleView(data.id)}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(data.id);
                    }}
                    variant="outline-primary"
                  >
                    Edit User
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(data.id);
                    }}
                    variant="outline-primary"
                  >
                    Delete User
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {addModal && (
        <AddUserModal
          addModal={addModal}
          onHide={() => {
            setAddModal(false);
            dispatch(resetDetails());
          }}
          setAddModal={setAddModal}
          employeeDetail={employeeDetail}
        />
      )}
    </div>
  );
};

export default Home;
