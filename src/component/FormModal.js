import { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

export const FormModal = ({
  show,
  handleClose,
  addForm,
  formData,
  setFormData,
}) => {
  const onSubmit = () => {
    console.log("submitt");
    addForm();
    setFormData({
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
    });

    handleClose();
  };

  useEffect(() => {
    const currentdate = new Date();
    const createdTime =
      currentdate.getFullYear() +
      "-" +
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1);

    setFormData((formData) => {
      return { ...formData, createdTime: createdTime };
    });
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>CREATE FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate className="ps-5 pe-5" onSubmit={onSubmit}>
          <Form.Control
            className="mb-3"
            name="name"
            value={formData.name}
            onChange={(e) => {
              const values = { ...formData };
              values.name = e.target.value;
              setFormData(values);
            }}
            type="text"
            placeholder="Name"
            required
          />
          <Form.Control
            name="description"
            value={formData.description}
            className="mb-3"
            onChange={(e) => {
              const values = { ...formData };
              values.description = e.target.value;
              setFormData(values);
            }}
            type="text"
            placeholder="Description"
            required
          />
          <Form.Control
            disabled
            name="createdTime"
            value={formData.createdTime}
            type="string"
            onChange={(e) => {
              const values = { ...formData };
              values.createdTime = e.target.value;
              setFormData(values);
            }}
          />
          {formData.fields.map((item, idx) => (
            <Container key={idx}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control
                  name="name"
                  className="mb-3"
                  value={item.name}
                  onChange={(e) => {
                    const values = { ...formData };
                    values.fields[idx].name = e.target.value;
                    setFormData(values);
                  }}
                  type="text"
                  placeholder="Name"
                />
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: "3rem",
                  }}
                >
                  <Form.Select
                    aria-label="Default select example"
                    className="mb-3"
                    style={{ width: "30%" }}
                    value={item.dataType}
                    onChange={(e) => {
                      const values = { ...formData };
                      values.fields[idx].dataType = e.target.value;
                      setFormData(values);
                    }}
                  >
                    <option value={"STRING"}>STRING</option>
                    <option value={"NUMBER"}>NUMBER</option>
                  </Form.Select>
                  <InputGroup className="mb-3" style={{ width: "30%" }}>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={item.required}
                      onChange={(e) => {
                        const values = { ...formData };
                        values.fields[idx].required = e.target.checked;
                        setFormData(values);
                      }}
                    />
                  </InputGroup>
                </Row>
              </Form.Group>
            </Container>
          ))}
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "3rem",
            }}
          >
            <Button
              variant="primary"
              onClick={() => {
                setFormData({
                  ...formData,
                  fields: [
                    ...formData.fields,
                    {
                      name: "",
                      required: false,
                      dataType: "STRING",
                    },
                  ],
                });
              }}
              size="lg"
              style={{ width: "30%" }}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={(item) => {
                if (formData.fields.length === 1) {
                  return;
                }

                setFormData({
                  ...formData,
                  fields: formData.fields.slice(0, -1),
                });
              }}
              size="lg"
              style={{ width: "30%" }}
            >
              Remove
            </Button>
          </Row>
          <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              type="submit"
              size="lg"
              style={{ width: "50%" }}
            >
              Create Form
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
