import React from 'react'
import {  Table } from "react-bootstrap";
export default function Ltable({ list }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Course Name</th>
          <th>LectureID</th>
          <th>Teacher Name</th>
          <th>Student Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Mode</th>
          <th>Place</th>
        </tr>
      </thead>
      <tbody>
        {list.map((it, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{it.courseName}</td>
            <td>{it.LectureID}</td>
            <td>{it.tSurname + " " + it.tName}</td>
            <td>{it.Surname + " " + it.Name}</td>
            <td>{it.Date.split(" ")[0]}</td>
            <td>{it.Time}</td>
            <td>{it.mode}</td>
            <td>{it.place}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
