import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const ViewEmployee = () => {
  const navigate = useNavigate();
  const viewData = useSelector((state) => state.employeeReducer.singleEmployee);
  const loading = useSelector((state) => state.employeeReducer.status);
  console.log('load',loading);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-column gap-3">
        {loading === "pending" ? (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          <>
            <h1>Name : {viewData.name}</h1>
            <h1>Email : {viewData.email}</h1>
            <Button onClick={() => navigate(-1)} variant="outline-primary">
              Homepage
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
