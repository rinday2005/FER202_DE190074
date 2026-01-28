import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, InputGroup } from 'react-bootstrap';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 4: Todo List</h3>
            <Form onSubmit={handleAddTodo}>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nhập công việc mới"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <Button variant="primary" type="submit">Thêm</Button>
                </InputGroup>
            </Form>
            <ListGroup>
                {todos.map((todo, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        {todo}
                        <Button variant="danger" size="sm" onClick={() => handleDeleteTodo(index)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default TodoList;
