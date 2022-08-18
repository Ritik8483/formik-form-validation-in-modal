import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewEmployee = () => {
  const navigate = useNavigate();
  const viewData = useSelector((state) => state.employeeReducer.singleEmployee);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-column gap-3">
        <h1>Name : {viewData.name}</h1>
        <h1>Email : {viewData.email}</h1>
        <Button onClick={() => navigate(-1)} variant="outline-primary">
          Homepage
        </Button>
      </div>
    </div>
  );
};

export default ViewEmployee;
