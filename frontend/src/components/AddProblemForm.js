import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProblem } from "../features/level/levelDetailsSlice";
const AddProblemForm = () => {
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
        marginBottom:"20px"
    }}>
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
      <Button variant="primary" type="submit" style={{
          width:"100%"
      }}>
        Add Problem
      </Button>
    </Form>
  );
};

export default AddProblemForm;
