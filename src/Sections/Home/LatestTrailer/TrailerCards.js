import React from 'react'
import { useEffect, useState } from 'react';
import PlaceHolder from '../../../Components/Cards/PlaceHolders/PlaceHolder';
import { Card, ListGroup } from 'react-bootstrap';
import { TrailerModal, ModalFrame } from '../../../Components/Modal/Modal';
export default function TrailerCards(props) {
    const [isPending, setIsPending] = useState(true);
    const [card, setCard] = useState({})
    useEffect(() => {
        fetch(props.url)
            .then((response) => response.json())
            .then((data) => {
                setCard(data)
                setIsPending(false)
                data.results.map(item => {
                })
            });

    }, [])
    return (
        <ListGroup className="list-group list-group-horizontal">
            <TrailerModal />
            {isPending && <PlaceHolder />}
            {card?.results?.map((movie) => {
                return (
                    <ListGroup.Item key={movie.id}
                        style={{ border: 'none', padding: '0' }}
                    >
                        <Card.Img
                            style={{ width: "370px", borderRadius: "8px" }}
                            src={"https://www.themoviedb.org/t/p/w780" + movie.backdrop_path}
                            alt="Card image"
                        />
                        <ModalFrame
                            id={movie.id}
                            type={props.secType}
                        />
                        <Card.ImgOverlay>
                            <Card.Title>{movie.title && movie.title || movie.name}</Card.Title>
                            <Card.Text>{movie.release_date && movie.release_date.slice(0, 4) || movie.first_air_date && movie.first_air_date.slice(0, 4)}
                            </Card.Text>
                        </Card.ImgOverlay>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
