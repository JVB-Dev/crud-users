import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Form, InputGroup, Container, Button } from "react-bootstrap";
import { FiUser, FiAtSign, FiKey, FiHash } from 'react-icons/fi';

import "./styles.css";
import api from "../../services/api";
import User from "../../models/User";

const RegisterUser = () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    };

    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: ''
    });

    const history = useHistory();
    const location: any = useLocation();

    useEffect(() => {
        if (location.state) {
            const user = location.state.user as User;
            setFormData(user);
        }
    }, [location]);


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            let response: any = null;
            if (!formData?.id)
                response = await api.post("users", formData, config);
            else {
                const url = `users/${formData.id}`;
                delete formData.id;
                response = await api.put(url, formData, config)
            }

            alert(response.data.message);

            history.replace("/Home");
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
            <Container fluid="sm" className="container-reg-user">
                <h1 className="center">REGISTER USER</h1>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <fieldset>
                                <div className={!formData?.id ? "" : "div-reg-user-info"}>
                                    {
                                        !formData?.id ? "" :
                                            <Form.Group className="input-reg-user-id">
                                                <Form.Label htmlFor="id">ID</Form.Label>
                                                <InputGroup className="mb-2 mr-sm-2">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text><FiHash /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control                                                        
                                                        type="id"
                                                        name="id"
                                                        id="id"
                                                        value={formData.id}
                                                        disabled />
                                                </InputGroup>
                                            </Form.Group>
                                    }
                                    <Form.Group className="input-reg-user-name">
                                        <Form.Label htmlFor="name">Name</Form.Label>
                                        <InputGroup className="mb-2 mr-sm-2">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FiUser /></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control placeholder="Enter user name"                                                
                                                type="name"
                                                name="name"
                                                id="name"
                                                onChange={handleInputChange}
                                                value={formData?.name}
                                                required />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
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
                                            value={formData?.email}
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
                                            value={formData?.password}
                                            required />
                                    </InputGroup>
                                </Form.Group>
                            </fieldset>

                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>


    );
};

export default RegisterUser;
