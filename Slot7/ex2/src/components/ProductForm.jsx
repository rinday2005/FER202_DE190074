import React, { useState } from 'react';
import { Form, Container, Card } from 'react-bootstrap';

function ProductForm() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 3: Product Form (Object State)</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nhập tên sản phẩm"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Nhập giá"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Danh mục</Form.Label>
                    <Form.Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Chọn danh mục</option>
                        <option value="electronics">Điện tử</option>
                        <option value="clothing">Thời trang</option>
                        <option value="books">Sách</option>
                    </Form.Select>
                </Form.Group>
            </Form>

            <Card className="mt-3 bg-light">
                <Card.Body>
                    <Card.Title>Current State Preview:</Card.Title>
                    <pre>{JSON.stringify(form, null, 2)}</pre>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductForm;
