import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function RecomendedCards(props) {
    const navigate = useNavigate()
    const { data } = props
    const handleClick = (id, type, name) => {
        const spaceReplace = name.replaceAll(' ', '-')
        navigate(`/display/${type}/${id}-${spaceReplace}`);
        navigate(0)
    }
    return (
        <>
            <h5 className="text-white">Recomended</h5>
            <div id='holder'>
                <ListGroup className="list-group list-group-horizontal">
                    {data?.results?.map(item => {
                        return (
                            <Card>
                                <Link
                                    key={item.id}
                                    onClick={(e) => handleClick(item.id, props.type, item.title || item.name)}
                                    id="card-link"
                                />
                                <Card.Img
                                    style={{ width: "300px" }}
                                    src={"https://www.themoviedb.org/t/p/w780" + item?.backdrop_path}
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
