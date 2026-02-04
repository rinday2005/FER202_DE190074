import React from 'react';
import { Card, Form } from 'react-bootstrap';

function Question({ questionData, selectedOption, onOptionSelect }) {
    return (
        <Card className="shadow-sm">
            <Card.Header as="h5">Question</Card.Header>
            <Card.Body>
                <Card.Title>{questionData.question}</Card.Title>
                <Form className="mt-3">
                    {questionData.options.map((option, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            id={`option-${index}`}
                            label={option}
                            name="quiz-options"
                            checked={selectedOption === option}
                            onChange={() => onOptionSelect(option)}
                            className="mb-2"
                        />
                    ))}
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Question;
