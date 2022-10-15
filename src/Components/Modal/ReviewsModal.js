import { Button, Modal, Card, Container, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function ReviewsModal(props) {
    const [review, setReview] = useState('')
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}/reviews?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1`)
            .then((response) => response.json())
            .then((data) => {
                setReview(data.results);

            });
    }, [props])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal-wrapper'
        > <Container
            className='review-modal-holder'
        >

                <Modal.Body>
                    {review ? review.map(result => {
                        return (
                            <Card style={{ width: '18rem' }}
                                className="modal-card">
                                <Card.Body>
                                    <Card.Title>
                                        <Image
                                            className='review-author-pic'
                                            src={result.author_details.avatar_path && result.author_details.avatar_path.substring(1)}
                                        />
                                        {result.author}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{result.created_at}</Card.Subtitle>
                                    <Card.Text>
                                        {result.content}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }) : <h1>No reviews</h1>}
                </Modal.Body>
            </Container>
        </Modal>
    );
}
export function ModalReviews(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button
                variant="primary"

                onClick={() => setModalShow(true)}
                className="open-modal custom-btn"
                id='modal-btn'
            >
                {props.name && props.name}
            </Button>

            <ReviewsModal
                id={props.id}
                show={modalShow}
                type={props.type}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}