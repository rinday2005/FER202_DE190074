import React, { useReducer, useState } from 'react';
import { Button, Form, ListGroup, Container, InputGroup } from 'react-bootstrap';

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: Date.now(), text: action.payload }];
        case 'DELETE_TASK':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
}

function TodoList2() {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            dispatch({ type: 'ADD_TASK', payload: newTodo });
            setNewTodo('');
        }
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 4 (useReducer): Todo List</h3>
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
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                        {todo.text}
                        <Button variant="danger" size="sm" onClick={() => dispatch({ type: 'DELETE_TASK', payload: todo.id })}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default TodoList2;
