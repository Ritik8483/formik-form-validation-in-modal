import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllEmployee } from "../slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";

const Home = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const [addModal,setAddModal]=useState(false);

  useEffect(() => {
    dispatch(getAllEmployee());
  }, []);

  const employeeData = useSelector((state) => state.employeeReducer.employees);
  console.log("ee", employeeData);

  return (
    <div>
      <div className="my-4 d-flex justify-content-center ">
        <Button onClick={()=>setAddModal(true)} variant="outline-primary">Add User</Button>
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
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td><Button variant="outline-primary">Edit User</Button></td>
                <td><Button variant="outline-primary">Delete User</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {
        addModal && 
        <AddUserModal addModal={addModal} setAddModal={setAddModal} />
      }
    </div>
  );
};

export default Home;
