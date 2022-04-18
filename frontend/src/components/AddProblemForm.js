import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProblem } from "../features/level/levelDetailsSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
const AddProblemForm = (props) => {
  const [formData, setFormData] = useState({
    contest: "",
    index: "",
  });
  const { contest, index } = formData;
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const problemData = {
      contest,
      index,
    };
    dispatch(addProblem(problemData));
  };
  return (
    <Form onSubmit={onSubmit} style={{
      marginBottom: "20px"
    }}>
      <MDBModal show={props.basicModal} setShow={props.setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>

            <MDBModalHeader>
              <MDBModalTitle>Create groupe</MDBModalTitle>
              <Button type="button" className='btn-close' color='none' onClick={props.toggleShow}></Button>
            </MDBModalHeader>

            <MDBModalBody>
            <Form.Group className="mb-3" controlId="contest">

              <Form.Label>Contest</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contest Number"
                name="contest"
                onChange={onChange}
                value={contest}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="index">
              <Form.Label>Index</Form.Label>
              <Form.Control
                type="text"
                placeholder="Problem Index"
                name="index"
                onChange={onChange}
                value={index}
              />
            </Form.Group>
               
            </MDBModalBody>

            <MDBModalFooter>
              <Button type="button" color='secondary' onClick={props.toggleShow}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: 150,
                  marginLeft: 3
                }}
              >
                Create Group
              </Button>
            </MDBModalFooter>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
          </Form>
          );
};

          export default AddProblemForm;
