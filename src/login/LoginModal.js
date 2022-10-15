import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import getToken from './useFetchUser'
export function LoginModal(props) {
    let url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState(false);
    //GET VALUE FROM INPUT USERNAME
    const getUsername = event => {
        setUsername(event.target.value);
    };
    //GET VALUE FROM INPUT PASSWORD
    const getPassword = event => {
        setPassword(event.target.value);
    };
    //IF USERNAME AND PASSWORD EXISTS IN LOCALSTORAGE
    let storageUsername = localStorage.getItem("username");
    let storagePassword = localStorage.getItem("password");
    useEffect(() => {
        if (storageUsername || storagePassword) {
            setCheck(true);
            setUsername(storageUsername);
            setPassword(storagePassword);
        }
    }, [])
    //SEND DATA TO USEFETCHUSER FOR LOGIN
    const handleSubmit = e => {
        e.preventDefault();
        getToken(url, username, password);
    };
    //CHECKBOX FOR REMEMBER USERNAME AND PASSWORD
    const rememberUser = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setCheck(true);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        } else {
            setCheck(false);
            localStorage.removeItem('username', username);
            localStorage.removeItem('password', password);
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            minLength={4}
                            placeholder="Username"
                            value={username}
                            onChange={getUsername}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={getPassword}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Check me out"
                            onClick={rememberUser}
                            onChange={e => { }}
                            checked={check}
                        />
                    </Form.Group>
                    <Button type='submit' variant="primary">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export function LoginButton() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button as='button' variant="primary" onClick={() => setModalShow(true)}>
                Login
            </Button>

            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
