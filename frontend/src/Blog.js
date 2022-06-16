import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Blog = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    const visibleHandler = () =>{
        if(!isVisible)
        setIsVisible(true);
        else
        setIsVisible(false);
    }

  return (
    <>
      <div className="border-bottom position-relative my-3">
        <h3 className="position-absolute top-100 start-50 translate-middle bg-white px-4 text-muted mb-3">
          Blogs
        </h3>
      </div>
      <Card className="mt-5">
        <Card.Header>{props.title}</Card.Header>
        { isVisible && <Card.Body>
          <Card.Text>
            <p className="text-muted">lasdasfsaff</p>
            <Card.Link className="text-primary">Link</Card.Link>
          </Card.Text>
        </Card.Body>}
      </Card>
    </>
  );
};

export default Blog;
