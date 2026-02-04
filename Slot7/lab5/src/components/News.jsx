import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { newsList } from '../data/newsData';

function News() {
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">News</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {newsList.map((news) => (
                    <Col key={news.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={news.images}
                                alt={news.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=News+Image' }} // Fallback image
                            />
                            <Card.Body>
                                <Card.Title>{news.title}</Card.Title>
                                <Card.Text>
                                    {news.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default News;
