import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProblemSubmission = (props) => {
  return (
    <>
        <td>1</td>
        <td>{props.problem.contest}</td>
        <td>{props.problem.index}</td>
        <td>{props.problem.name}</td>
        <td>{props.problem.rating}</td>
    </>
  )
}

export default ProblemSubmission