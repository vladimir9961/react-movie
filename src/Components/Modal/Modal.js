import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
export function TrailerModal(props) {
    const [video, setVideo] = useState('')

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}/videos?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1`)
            .then((response) => response.json())
            .then((data) => {
                setVideo(data.results[0].key);
            });
    }, [props])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {video && <iframe src={`https://www.youtube.com/embed/${video}`}></iframe>}
        </Modal>
    );
}

export function ModalFrame(props) {
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

            <TrailerModal
                id={props.id}
                show={modalShow}
                type={props.type}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
