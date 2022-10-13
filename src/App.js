/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { FormModal } from "./component/FormModal";

const initialValue = {
  name: "",
  description: "",
  createdTime: "",
  fields: [
    {
      name: "",
      required: false,
      dataType: "STRING",
    },
  ],
};

const App = () => {
  const navigate = useNavigate();

  const [localStorageData, setLocalStorageData] = useState();
  const [formData, setFormData] = useState(initialValue);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredForms = !search
    ? localStorageData
    : localStorageData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const addForm = () => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (!data) {
      localStorage.setItem("items", JSON.stringify([formData]));
      return;
    }
    const newData = [...data, formData];
    localStorage.setItem("items", JSON.stringify(newData));
    setLocalStorageData(newData);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (data) {
      setLocalStorageData(data);
    }
  }, [formData]);

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        style={{
          borderRadius: "20px",
          padding: "10px",
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
        value={search}
        onChange={handleChange}
      />
      {filteredForms?.map((item, index) => (
        <Col
          key={index}
          style={{
            maxHeight: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            /* border: "3px solid yellow", */
          }}
          onClick={() => navigate(`/${item.name}`)}
        >
          <Col
            style={{
              border: "1px solid black",
              borderRight: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "30px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </Col>
          <Col
            style={{
              cursor: "pointer",
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "300px",
              paddingLeft: "1rem",
            }}
          >
            {item.name}
          </Col>
        </Col>
      ))}
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => {
          handleShow();
        }}
      >
        Create New Form
      </Button>
      <FormModal
        show={show}
        handleClose={handleClose}
        addForm={addForm}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
};

export default App;
