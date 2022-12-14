import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { addNewEmployee, getAllEmployee, resetDetails, updateEmployeeData } from "../slices/employeeSlice";
import { ToastContainer, toast } from 'react-toastify';

const AddUserModal = ({ addModal,onHide, setAddModal,employeeDetail,isLastPage }) => {
    const dispatch=useDispatch();
    const [enableEdit,setEnableEdit]=useState(true);
  const initialValues = {
    name: "",
    email: "",
  };
  const notify = () => toast("Employee added successfully!");
  const update = () => toast("Employee updated successfully!");

  const validation = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must be 5 characters or more")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required(" Email is required"),
  });
  const submitForm = (values) => {
    if(employeeDetail.id){
      dispatch(updateEmployeeData(values));
      setTimeout(() => {
        onHide();
        update();
      // dispatch(getAllEmployee());
      }, 500);
    }
    else{
      dispatch(addNewEmployee({values:values,isLastPage:isLastPage}));
      setTimeout(() => {
          setAddModal(false);
          notify();
          dispatch(getAllEmployee());
      }, 50);
      setEnableEdit(false);
    }
    
  };

  return (
    <div>
      <Modal show={addModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{employeeDetail.id ? 'Edit' : 'Add'} User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex w-100  gap-3 flex-column">
          {/* <h5 className="text-center">Add Employee</h5> */}
          {/* <Form className="w-100 d-flex align-items-center justify-content-center gap-3 flex-column">
              <Form.Control className="w-100" type="name" placeholder="Enter name" />
              <Form.Control className="w-100" type="email" placeholder="Enter email" />
          </Form> */}
          <Formik
            className="w-100"
            initialValues={employeeDetail || initialValues}
            onSubmit={submitForm}
            validationSchema={validation}
            enableReinitialize={enableEdit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="w-100 d-flex align-items-center justify-content-center gap-3 flex-column">
                <InputField controlId="validation01" placeholder="Enter your name" type="text" name='name' value={values.name} onChange={handleChange} isInvalid={!!errors.name} errors={errors.name} />
                <InputField controlId="validation02" placeholder="Enter your email" type="email" name='email' value={values.email} onChange={handleChange} isInvalid={!!errors.email} errors={errors.email} />
                <div className="w-100 gap-3 d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(resetDetails())
                      setAddModal(false)
                    }}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModal;
