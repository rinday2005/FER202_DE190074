import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";

import NavbarExpenses from "./NavbarExpenses";
import FooterExpenses from "./FooterExpenses";
import ModalConfirm from "./ModalConfirm";

import { getExpenses, addExpense, updateExpense, deleteExpense } from "../services/ExpensesAPI";
import { formatCurrency, formatDate } from "../utils/formatters";

function ExpensesDashboard() {

  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {

    const data = await getExpenses();

    setExpenses(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editingId) {

      await updateExpense(editingId, formData);

    } else {

      await addExpense(formData);
    }

    setEditingId(null);

    setFormData({
      name: "",
      amount: "",
      category: "Food",
      date: ""
    });

    fetchData();
  };

  const handleEdit = (exp) => {

    setFormData(exp);

    setEditingId(exp.id);
  };

  const handleDeleteClick = (id) => {

    setDeleteId(id);

    setShowModal(true);
  };

  const confirmDelete = async () => {

    await deleteExpense(deleteId);

    setShowModal(false);

    fetchData();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (

    <div>

      <NavbarExpenses />

      <Container className="mt-4">

        <Card className="mb-4">
          <Card.Body>

            <h5>Total Expenses</h5>

            <h3>{formatCurrency(total)}</h3>

          </Card.Body>
        </Card>

        <Row>

          <Col md={4}>

            <Card>
              <Card.Body>

                <h5>
                  {editingId ? "Edit Expense" : "Add Expense"}
                </h5>

                <Form onSubmit={handleSubmit}>

                  <Form.Control
                    className="mb-2"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <Form.Control
                    className="mb-2"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />

                  <Form.Select
                    className="mb-2"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                  </Form.Select>

                  <Form.Control
                    type="date"
                    name="date"
                    className="mb-3"
                    value={formData.date}
                    onChange={handleChange}
                  />

                  <Button type="submit">
                    Save
                  </Button>

                </Form>

              </Card.Body>
            </Card>

          </Col>

          <Col md={8}>

            <Table bordered>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th></th>
                </tr>

              </thead>

              <tbody>

                {expenses.map(e => (

                  <tr key={e.id}>

                    <td>{e.name}</td>
                    <td>{formatCurrency(e.amount)}</td>
                    <td>{e.category}</td>
                    <td>{formatDate(e.date)}</td>

                    <td>

                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(e)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        className="ms-2"
                        variant="danger"
                        onClick={() => handleDeleteClick(e.id)}
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </Table>

          </Col>

        </Row>

      </Container>

      <FooterExpenses />

      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        message="Are you sure?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />

    </div>
  );
}

export default ExpensesDashboard;