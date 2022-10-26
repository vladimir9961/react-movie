import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Badge, Form } from 'react-bootstrap';
import FavoriteBtn from '../../Components/Cards/userActions/FavoriteBtn'
import WatchlistBtn from '../../Components/Cards/userActions/WatchlistBtn'
let session = localStorage.getItem('session-id');
let accId = localStorage.getItem('user-id');
export default function Watchlist() {
    const [watchlist, setwatchlist] = useState(null)
    const [type, setType] = useState("movie")
    const [existFavorite, setExistFavorite] = useState(false);
    const [existWatchlist, setExistWatchlist] = useState(false);
    const styles = {
        favorite: {
            color: "black"
        },
        watchlist: {
            color: existWatchlist ? "red" : "black"
        },
        // list: {
        //     display: showlist ? "block" : "none"
        // },
        // rate: {
        //     display: showRate ? "flex" : "none"
        // }
    }
    function removeItem(id) {
        const newWatchlist = watchlist.filter((l) => l.id !== id)
        setwatchlist(newWatchlist)
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://api.themoviedb.org/3/account/${accId}/watchlist/${type === "movie" ? "movies" : "tv"}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&sort_by=created_at.desc&page=1`);
            const response = await data.json();
            setwatchlist(response.results);
            return response;
        }
        fetchData()
    }, [type])
    return (
        <Container className='p-0'>
            <Form.Check
                type="switch"
                id="popular-switch"
                onClick={(e) => {
                    if (e.target.checked === true) {
                        setType("tv")
                        console.log(type)
                    } else {
                        console.log(type)
                        setType("movie")
                    }
                }}
                label={type === 'movies' ? "Movie" : "Tv's"}
            />
            {watchlist && watchlist?.map((result) => {
                return (
                    <>
                        {<Card
                            key={result.id}
                            className="card-results mt-3 watchlist-card">
                            <Card.Body>
                                <Row>
                                    <Col className='col-3'>
                                        <Card.Img
                                            src={`https://www.themoviedb.org/t/p/w185${result.poster_path && result.poster_path || result.profile_path && result.profile_path}`}
                                            id="img-search"
                                        />
                                    </Col>
                                    <Col className='col-9 right'>
                                        <Row className='mb-3'>
                                            <Card.Title className='d-flex align-items-center'>
                                                <Badge
                                                    className='me-2'
                                                    id="card-rating"
                                                >{result.vote_average.toString().slice(0, 3)}</Badge>
                                                {result.title && result.title || result.name && result.name}
                                            </Card.Title>
                                            <Card.Text className="text-muted">
                                                {result.release_date || result.first_air_date}
                                            </Card.Text>
                                        </Row>
                                        <Row className='description'>
                                            <Col className='col-12'>
                                                <Card.Text
                                                    onClick={() => removeItem(result.id)}
                                                >
                                                    {result.known_for_department
                                                        ||
                                                        result.overview
                                                    }

                                                </Card.Text>
                                            </Col>
                                            <Col className='col-12 d-flex'>
                                                <FavoriteBtn
                                                    aria-labelledby="add to favorite"
                                                    style={styles.favorite}
                                                    id={result.id}
                                                    type={type}
                                                // exist={true}
                                                />
                                                <span
                                                    onClick={(e) => removeItem(result.id)}
                                                >
                                                    <WatchlistBtn
                                                        aria-labelledby="add to favorite"
                                                        style={styles.favorite}
                                                        id={result.id}
                                                        type={type}
                                                    />
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>}
                    </>
                )
            })
            }
        </Container>
    )
}
