import { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, InputGroup, Card, Container } from 'react-bootstrap';
import { FiAtSign, FiKey } from 'react-icons/fi';

import "./styles.css";
import api from "../../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const { data } = await api.post("login", formData);
      localStorage.setItem("token", data.token);

      history.push("/Home");
    } catch (error) {
      if (error.response) {
        // `${error.response.data} - ${error.response.status} - ${error.response.headers}`

        const { auth, message } = error.response.data;
        alert(message);

        if (auth !== null && !auth) {
          localStorage.removeItem("token");
          history.replace("/");
        }
      }
    }
  }

  return (
    <div>
      <Container fluid="sm" className="vertical-align">
        <h1 className="center">LOGIN</h1>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <fieldset>
                <Form.Group>
                  <Form.Label htmlFor="email">Email address</Form.Label>
                  <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text><FiAtSign /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control placeholder="Enter email"
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      required />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text><FiKey /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleInputChange}
                      required />
                  </InputGroup>
                </Form.Group>
              </fieldset>

              <Button type="submit">Validar</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
