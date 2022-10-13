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
  const changeHandler = (e) => {
    setFormData((formData) => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  };

  const MyDate = new Date();
  let MyDateString;

  MyDate.setDate(MyDate.getDate() + 20);

  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>CREATE FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="ps-5 pe-5" onSubmit={changeHandler}>
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
            required={true}
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
            required={true}
          />
          <Form.Control
            name="createdTime"
            value={MyDateString}
            type="string"
            placeholder={MyDateString}
            required={true}
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
                  required={true}
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
              type="submit"
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
              type="submit"
              onClick={(item) => {
                if (formData.length === 1) {
                  return;
                }
                formData.splice(item, 1);
                setFormData([...formData]);
              }}
              size="lg"
              style={{ width: "30%" }}
            >
              Remove
            </Button>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
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
          }}
          size="lg"
          style={{ width: "50%" }}
        >
          Create Form
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
