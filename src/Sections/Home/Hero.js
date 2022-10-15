import { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
export default function Hero() {
    const [value, setvalue] = useState("");

    function register(event) {
        event.preventDefault()
        window.location.replace(`/search?query=${value}`);
    }
    function handleChange(e) {
        setvalue(e.target.value);
    }
    return (
        <>
            <Container
                fluid
                id="hero-img"
            >
                <Container
                    style={{ height: "100%" }}

                >
                    <Row
                        className="hero-holder"
                    >
                        <h1 className="display-4 fw-bold text-white">Welcome.</h1>
                        <p className="text-white">Millions of movies, TV shows and people to discover. Explore now.</p>

                        <Form onSubmit={register}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a movie,tvshow,person...."
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>


                    </Row>
                </Container>
            </Container>
        </>
    )
}
