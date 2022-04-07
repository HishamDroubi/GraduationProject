import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProblemSubmission = (props) => {
  return (
    <>
        <Card md='5'>
        <Card.Header>
          {props.userName}
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            
            <footer className="blockquote-footer">
              {props.userName}  solved problem <a href={props.problem.url} className="text-warning stretched-link">{props.problem.contest}{props.problem.index}-{props.problem.name}</a>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      <br/>
    </>
  )
}

export default ProblemSubmission