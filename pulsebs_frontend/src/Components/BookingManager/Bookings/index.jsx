import React, { useEffect, useState } from "react";
import { Form, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import API from "../../../api/API";
import style from "./style.module.css";

export default function Index() {
  const loc = useLocation();
  const lastName = loc.pathname.split("/")[loc.pathname.split("/").length - 1];
  const [query, setQuery] = useState({});

  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
    return () => {};
  }, [query]);

  async function getList() {
    const res = await API.getBooksList(query);
    setList(res);
  }

  function itemChange(val, type) {
    const obj = {
      [type]: val,
    };
    obj.time = obj.timeFormat
      ? obj.timeFormat.split("-").reverse().join("-")
      : "";
    setQuery(obj);
  }

  return (
    <>
      <div className={style["div-wrap"]}>
        <h1>{lastName}</h1>
        <Form>
          <Row>
            <Col>
              Courses :{" "}
              <Form.Control
                as="select"
                className={style["cos"]}
                defaultValue=""
                placeholder="Courses name"
                onChange={(e) => itemChange(e.target.value, "courseId")}
              >
                <option value="">please select</option>
                <option value="IS001">Information System</option>
                <option value="SE001">Software Engineering</option>
                <option value="CA001">Computer Architectures</option>
              </Form.Control>
            </Col>
            <Col>
              Month-Year :{" "}
              <Form.Control
                className={style["cos"]}
                type="month"
                name="dob"
                placeholder="Date of Birth"
                onChange={(e) => itemChange(e.target.value, "timeFormat")}
              />
            </Col>
          </Row>
        </Form>
        <div className={style["tabe"]}>
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
                  <td>{it.tSurname +" "+ it.tName}</td>
                  <td>{it.Surname +" "+ it.Name}</td>
                  <td>{it.Date}</td>
                  <td>{it.Time}</td>
                  <td>{it.mode}</td>
                  <td>{it.place}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
