import React, { useState } from 'react';
import { Form, Container, Card, Button } from 'react-bootstrap';

function ProductForm() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';

        if (!form.price) {
            newErrors.price = 'Vui lòng nhập giá';
        } else if (Number(form.price) <= 0) {
            newErrors.price = 'Giá trị không hợp lệ, vui lòng nhập lại đúng giá trị';
        }

        if (!form.category) newErrors.category = 'Vui lòng chọn danh mục';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Thêm sản phẩm thành công!');
            // Reset form if needed
            // setForm({ name: '', price: '', category: '' });
        }
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 3: Product Form (Object State)</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nhập tên sản phẩm"
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Nhập giá"
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Danh mục</Form.Label>
                    <Form.Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        isInvalid={!!errors.category}
                    >
                        <option value="">Chọn danh mục</option>
                        <option value="electronics">Điện tử</option>
                        <option value="clothing">Thời trang</option>
                        <option value="books">Sách</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
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
