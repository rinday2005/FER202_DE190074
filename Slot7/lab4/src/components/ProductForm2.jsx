import React, { useReducer } from 'react';
import { Form, Container, Card, Button } from 'react-bootstrap';

const initialState = {
    name: '',
    price: '',
    category: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

function ProductForm2() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        dispatch({
            type: 'CHANGE_INPUT',
            field: e.target.name,
            value: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!state.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';

        if (!state.price) {
            newErrors.price = 'Vui lòng nhập giá';
        } else if (Number(state.price) <= 0) {
            newErrors.price = 'Giá trị không hợp lệ, vui lòng nhập lại đúng giá trị';
        }

        if (!state.category) newErrors.category = 'Vui lòng chọn danh mục';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Thêm sản phẩm thành công!');
            dispatch({ type: 'RESET_FORM' });
        }
    };

    return (
        <Container className="mt-4">
            <h3>Exercise 3 (useReducer): Product Form (Object State)</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={state.name}
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
                        value={state.price}
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
                        value={state.category}
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
                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        dispatch({ type: 'RESET_FORM' });
                        setErrors({});
                    }}>
                        Reset Form
                    </Button>
                </div>
            </Form>

            <Card className="mt-3 bg-light">
                <Card.Body>
                    <Card.Title>Current State Preview:</Card.Title>
                    <pre>{JSON.stringify(state, null, 2)}</pre>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductForm2;
