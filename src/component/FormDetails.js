/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const FormDetail = ({ localStorageData }) => {
  const { name } = useParams();
  const [filteredForm, setFilteredForm] = useState();
  console.log("filteredForm", filteredForm);
  const [state, setState] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    const newForm = data.filter((item) => item.name === name);
    setFilteredForm(newForm);
  }, []);

  const handleChange = (e, i) => {
    const { value, name } = e.target;

    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };

    console.log("newState", newState);
    setState(newState);
  };

  console.log("localStorageData ==>>", localStorageData);
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "50%",
      }}
    >
      {filteredForm && (
        <Col
          style={{
            border: "1px solid grey",
          }}
        >
          <Form className="ps-5 pe-5 pt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {filteredForm.map((item, index) => (
                <Container key={index}>
                  <Form.Label className="mb-3">{item.name}</Form.Label>
                  <div>
                    {item.fields?.map((item_, key) => (
                      <Form.Control
                        key={index}
                        placeholder={item_?.name}
                        type={item_.dataType === "STRING" ? "text" : "number"}
                        required={item_.required}
                        className="mb-4"
                        value={state}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </Container>
              ))}
            </Form.Group>
            <Row>
              <Button
                variant="primary"
                type="submit"
                style={{ width: "50%", margin: "0 auto", marginBottom: "1rem" }}
                onClick={() => null}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      )}
    </Container>
  );
};
