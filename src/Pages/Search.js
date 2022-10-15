import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, ListGroup, Badge } from 'react-bootstrap';

export default function Search() {
    const [query, setquery] = useState({})
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.query;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&query=${value}&page=1`)
            .then(res => res.json())
            .then((data) => {
                setquery(data.results)
            })
    }, [value])

    return (
        <Container className='searches-wrapper'>
            <Row>
                <Col className="col-4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush" key="0">
                            <ListGroup.Item key="1">People<Badge bg="secondary">4</Badge></ListGroup.Item>
                            <ListGroup.Item key="2">Movies <Badge bg="secondary">1</Badge></ListGroup.Item>
                            <ListGroup.Item key="3">TV Shows<Badge bg="secondary">9</Badge></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col className="col-8">
                    {Array.isArray(query) ? query.map((result) => {
                        return (
                            <Card key={result.id} className="card-results">
                                <Card.Body>
                                    <Row>
                                        <Col className='col-3'>
                                            <Card.Img
                                                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path && result.poster_path || result.profile_path && result.profile_path}`}
                                                id="img-search"
                                            />
                                        </Col>
                                        <Col className='col-9'>
                                            <Row className='mb-3'>
                                                <Card.Title>
                                                    {result.title && result.title || result.name && result.name}
                                                </Card.Title>
                                                <Card.Text className="text-muted">2 days ago</Card.Text>
                                            </Row>
                                            <Row>

                                                <Card.Text>
                                                    {result.known_for_department
                                                        ||
                                                        result.overview
                                                    }
                                                </Card.Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    }) : null}
                </Col>
            </Row>
        </Container>
    )
}
