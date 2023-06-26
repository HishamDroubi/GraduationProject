import React, { useState } from 'react'
import SideBar from '../Utils/SideBar'
import { Table } from 'react-bootstrap'

const LevelTable = ({level }) => {

    const [problems, setProblems] = useState(level.problems);
   
    const onFilterHandler = (choice) => {
        console.log(choice)
        if (choice === '1') {
            setProblems(level.problems);
        }
        else if (choice === '2') {
            setProblems(level.problems.filter(p => level.solvedProblems.find(p1 => p1._id === p._id)));
        }
        else {
            setProblems(level.problems.filter(p => !level.solvedProblems.find(p1 => p1._id === p._id)));
        }
    }
    return (
        <>
            <div className="flex w-full" >
                <SideBar level={level} onFilterHandler={onFilterHandler} />
                <div className="w-3/4"> <Table

                    hover
                    responsive
                    style={{ textAlign: "center", border: "1px solid black" }}
                >
                    <thead
                        style={{
                            backgroundColor: "#e9eae5",
                        }}
                    >
                        <tr>
                            <th className="col-3">ID</th>
                            <th className="col-6">Name</th>
                            <th className="col-3">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr
                                key={problem._id}
                                style={{
                                    backgroundColor:
                                        level.solvedProblems.find((p) => p._id === problem._id) &&
                                        "#90ee90",
                                }}
                            >
                                <td>
                                    {problem.contest}
                                    {problem.index}
                                </td>
                                <td>
                                    <a
                                        href={problem.url}
                                        key={problem._id}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        style={{
                                            textDecoration: "none",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {problem.name}
                                    </a>
                                </td>
                                <td>{problem.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table></div>
            </div></>
    )
}

export default LevelTable