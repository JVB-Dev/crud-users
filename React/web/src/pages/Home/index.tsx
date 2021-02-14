import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Container, Button, ButtonGroup } from "react-bootstrap";
import { FiEdit2, FiTrash2, } from 'react-icons/fi';

import "./styles.css";
import api from "../../services/api";
import User from "../../models/User";

const Home = () => {
  const config = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };

  const [users, setUsers] = useState<User[]>([]);

  const history = useHistory();

  useEffect(() => {
    api.get("users", config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const { auth, message } = error.response.data;
          alert(message);

          if (auth !== null && !auth) {
            localStorage.removeItem("token");
            history.replace("/");
          }
        }
      });
  }, []);

  function handleRemoveClick(user: User) {
    api.delete(`/users/${user.id}`, config)
      .then((res) => {
        setUsers(users.filter((u) => u.id !== user.id));
        alert(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const { auth, message } = error.response.data;
          alert(message);

          if (auth !== null && !auth) {
            localStorage.removeItem("token");
            history.replace("/");
          }
        }
      });
  }

  function handleEditClick(user: User) {
    history.push({
      pathname: '/RegisterUser',
      state: {
        user
      }
    })
  }

  function handleCreateClick() {
    history.push('/RegisterUser');
  }

  return (
    <div>
      <Container fluid className="container-user">
        <h1 className="center">USERS</h1>

        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <Card className="card-user">
                <p className="user-id"><b>{user.id}</b> - {user.name}</p>
                <p className="user-email">{user.email}</p>
                <ButtonGroup className="user-div-btn">
                  <Button variant="dark" className="btn-edit-card-user btn-card-user" onClick={() => handleEditClick(user)}><FiEdit2 /></Button>
                  <Button variant="danger" className="btn-remove-card-user btn-card-user" onClick={() => handleRemoveClick(user)}><FiTrash2 /></Button>
                </ButtonGroup>
              </Card>
            </li>
          ))}
        </ul>

        <Button className="btn-create-user" onClick={() => handleCreateClick()}>create user</Button>
      </Container>
    </div>
  );
};

export default Home;
