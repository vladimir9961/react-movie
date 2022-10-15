import { Card, Placeholder } from "react-bootstrap"

export default function PlaceHolder() {
    return (
        <>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={5} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={8} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
            <Card className="placeholder-div">
                <Card.Img variant="top" src={require("../../../assets/images/placeholder-img.jpg")} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                        <Placeholder xs={3} />{' '}
                    </Placeholder>
                </Card.Body>
            </Card>
        </>
    )
}
