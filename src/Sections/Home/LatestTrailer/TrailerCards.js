import React from 'react'
import { useEffect, useState } from 'react';
import PlaceHolder from '../../../Components/Cards/PlaceHolders/PlaceHolder';
import { Card, ListGroup } from 'react-bootstrap';
import { TrailerModal, ModalFrame } from '../../../Components/Modal/Modal';
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function TrailerCards(props) {
    const [isPending, setIsPending] = useState(true);
    const [card, setCard] = useState([]);
    const [background, setBackground] = useState(false)
    useEffect(() => {
        async function getItems() {
            let response = await fetch(props.url)
            response = await response.json()
            setCard(response.results)
            setBackground(response.results && "https://www.themoviedb.org/t/p/w780" + response.results[0].backdrop_path)
            setIsPending(false)
        }
        getItems()
    }, [])

    const hoveredCard = (e) => {
        if (background !== e) {
            setBackground(e);
        }
    }

    return (
        <div className="w-100 triler-holder draggable"
            style={{ background: `url(${background})` }}
        >
            <div className='mask scroll-wrapper'>

                <ListGroup className="list-group list-group-horizontal"
                >
                    <TrailerModal />
                    {isPending && <PlaceHolder />}
                    {
                        card?.map((movie) => {
                            return (
                                <ListGroup.Item
                                    key={movie.id}
                                    className='treiler-card'
                                    style={{ border: 'none', padding: '0' }}
                                    onMouseEnter={() => hoveredCard("https://www.themoviedb.org/t/p/w780" + movie?.backdrop_path)}
                                >
                                    <LazyLoadImage
                                        style={{ width: "370px", borderRadius: "8px", height: 'auto' }}
                                        src={"https://www.themoviedb.org/t/p/w780" + movie.backdrop_path}

                                        alt="Card image"
                                    />
                                    <ModalFrame
                                        id={movie.id}
                                        type={props.secType}
                                        name={movie.title && movie.title || movie.name}
                                    />
                                    <Card.ImgOverlay>
                                        <Card.Title>{movie.title && movie.title || movie.name}</Card.Title>
                                        <Card.Text>{movie.release_date && movie.release_date.slice(0, 4) || movie.first_air_date && movie.first_air_date.slice(0, 4)}
                                        </Card.Text>
                                    </Card.ImgOverlay>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup >
            </div>
        </div>
    )
}
