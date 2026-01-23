import { useState } from "react";
import { Container, Card, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import usersData from "../data/ListOfUsers";


export default function ManageUsers() {
  const [users, setUsers] = useState(usersData);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
    locked: false,
  });

  /* OPEN ADD */
  const handleAdd = () => {
    setIsEdit(false);
    setCurrentUser({
      id: "",
      name: "",
      email: "",
      avatar: "",
      locked: false,
    });
    setShow(true);
  };

  /* OPEN EDIT */
  const handleEdit = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setShow(true);
  };

  /* SAVE USER */
  const handleSave = () => {
    if (isEdit) {
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      setUsers([
        ...users,
        {
          ...currentUser,
          id: Date.now(),
        },
      ]);
    }
    setShow(false);
  };

  /* LOCK / UNLOCK */
  const toggleLock = (id) => {
    setUsers(
      users.map(u =>
        u.id === id ? { ...u, locked: !u.locked } : u
      )
    );
  };

  return (
    <Container className="manager-page">
      {/* HEADER */}
      <div className="manager-header">
        <div>
          <h2>User Management</h2>
          <p>Refined administration and access control</p>
        </div>

        <Button className="btn-add-user" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>
          Add New User
        </Button>
      </div>

      <Row className="mb-4">
  <Col md={4}>
    <Card className="stat-card">
      <Card.Body>
        <h6>Total Users</h6>
        <h3>{users.length}</h3>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="stat-card">
      <Card.Body>
        <h6>Locked Users</h6>
        <h3>{users.filter(u => u.locked).length}</h3>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="stat-card">
      <Card.Body>
        <h6>Active Users</h6>
        <h3>{users.filter(u => !u.locked).length}</h3>
      </Card.Body>
    </Card>
  </Col>
</Row>


      {/* TABLE */}
      <Card className="manager-card">
        <Table responsive borderless>
          <thead>
            <tr>
              <th>ID</th>
              <th className="text-center">Avatar</th>
              <th>User</th>
              <th>Password</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={u.locked ? "locked-row" : ""}>
                <td>{u.id}</td>

                <td className="text-center">
                  <img src={u.avatar} alt="" className="avatar" />
                </td>

                <td>
                  <div className="user-info">
                    <span className="name">{u.name}</span>
                    <span className="email">{u.email}</span>
                  </div>
                </td>

                <td>••••••••</td>

                <td className="text-end">
                  <Button
                    variant="link"
                    className="action edit"
                    onClick={() => handleEdit(u)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  <Button
                    variant="link"
                    className={`action ${u.locked ? "lock" : "unlock"}`}
                    onClick={() => toggleLock(u.id)}
                  >
                    <i className={`bi ${u.locked ? "bi-lock" : "bi-unlock"}`}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* MODAL ADD / EDIT */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                value={currentUser.avatar}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, avatar: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
