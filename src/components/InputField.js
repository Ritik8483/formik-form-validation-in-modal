import React from "react";
import { FormGroup, FormControl, Form } from "react-bootstrap";


const InputField = ({placeholder,isInvalid,type,name,isValid,value,onChange,controlId, errors,}) => {
    // const { touched, errors } = form;

  return (
    <div className="w-100">
      {/* <Form className="w-100"> */}
        <Form.Group className="mb-3 w-100" controlId={controlId}>
          <Form.Control className="w-100" isInvalid={isInvalid} placeholder={placeholder} isValid={isValid} type={type} name={name} value={value} onChange={onChange} />
          <Form.Control.Feedback type="invalid"  >
            {errors}
            
        </Form.Control.Feedback>
        </Form.Group>
      {/* </Form> */}
    </div>
  );
};

export default InputField;
