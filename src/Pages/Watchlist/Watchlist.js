import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';

export default function Watchlist() {
    const [watchlist, setwatchlist] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=779d127bd5c1fc6d240099dba0c6b4e341443532&sort_by=created_at.asc&page=1`);
            const response = await data.json();
            setwatchlist(response.results);
            return response;
        }
        fetchData()
    }, [])
    return (
        <>
            {watchlist && watchlist?.map((result) => {
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
            })
            }

        </>
    )
}
