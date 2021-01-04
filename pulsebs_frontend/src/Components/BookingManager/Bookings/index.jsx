import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import API from "../../../api/API";
import style from "./style.module.css";
import Ltable from "./Ltable";



export default function IndexMyBooks() {
  const loc = useLocation();
  const locs = loc.pathname.split("/")
  const lastName = locs[locs.length - 1];
  const [query, setQuery] = useState({});

  const [myList, setMyList] = useState([]);
  useEffect(() => {
    getListData();
    return () => {};
  }, [query]);

  async function getListData() {
    const res = await API.getBooksList(query);
    setMyList(res);
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
              Month-Year : {" "}
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
          <Ltable list={myList}></Ltable>
        </div>
      </div>
    </>
  );
}