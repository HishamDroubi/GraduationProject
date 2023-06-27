import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProblem } from "../../features/level/levelDetailsSlice";
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

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <> <button onClick={toggleShow}>Add problem</button>
    <Form onSubmit={onSubmit} style={{
      marginBottom: "20px"
    }}>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>

            <MDBModalHeader>
              <MDBModalTitle>Add Problem</MDBModalTitle>
              <Button type="button" className='btn-close' color='none' onClick={toggleShow}></Button>
            </MDBModalHeader>

            <MDBModalBody>

              <div className="flex flex-col justify-between">
              
              <Form.Control
              className="my-3"
              width={"75%"}
                type="text"
                placeholder="Contest Number"
                name="contest"
                onChange={onChange}
                value={contest}
              />
           

           
              <Form.Control
              className="my-5"
              width={"75%"}
                type="text"
                placeholder="Problem Index"
                name="index"
                onChange={onChange}
                value={index}
              />
              </div>
               
            </MDBModalBody>

            <MDBModalFooter>
              <Button type="button" color='secondary' onClick={toggleShow}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: 75,
                  marginLeft: 3
                }}
              >
                Add
              </Button>
            </MDBModalFooter>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
          </Form>
          </>
          );
};

          export default AddProblemForm;
