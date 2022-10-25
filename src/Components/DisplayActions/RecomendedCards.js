import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function RecomendedCards(props) {
    const navigate = useNavigate()
    const { data } = props
    const handleClick = (id, type, name) => {
        const spaceReplace = name.replaceAll(' ', '-')
        navigate(`/display/${type}/${id}-${spaceReplace}`);
        navigate(0)
        console.log('click')
    }
    return (
        <>
            <h2 className="text-white">Recomended</h2>
            <div id='holder'>
                <ListGroup className="list-group list-group-horizontal">
                    {data?.results?.map(item => {
                        return (
                            <Card>
                                <Link
                                    key={item.id}
                                    onClick={(e) => handleClick(item.id, props.type, item.title || item.name)}
                                    id={item.title || item.name}
                                    aria-label={`${item.title || item.name}`}
                                    className="recomended-link"
                                />
                                <LazyLoadImage
                                    style={{ width: "300px" }}
                                    id="recomended-cards"
                                    alt="recomended-cards"
                                    src={
                                        item.backdrop_path ? "https://www.themoviedb.org/t/p/w780" + item?.backdrop_path
                                            : require('../../assets/images/placeholder-img.jpg')}
                                />
                                <Card.ImgOverlay>
                                    <Card.Title
                                        className="text-white"
                                    >{item.title || item.name}</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        )
                    })}
                </ListGroup>
            </div >
        </>
    )
}
