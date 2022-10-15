import { Form, ListGroup } from 'react-bootstrap'
import CreateCards from '../../Components/Cards/CreateCards';
import { useState } from 'react';

export default function PopularSection() {
    const [show, setShow] = useState(false)
    const [movieOrTv, setMovieOrTv] = useState(false)
    let moviesPupular = "https://api.themoviedb.org/3/movie/popular?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&page=1";
    let tvPopular = "https://api.themoviedb.org/3/tv/popular?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&page=1";
    const movie = "movie";
    const tv = "tv";

    return (
        <section
            className=" holder-container"
        >
            <div className="d-flex w-100 flex-row flex-nowrap scroll">
                <h2>Popular</h2>
                <div className="selector d-flex">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onClick={(e) => {
                            setShow(!show)
                            if (e.target.checked === true) {
                                setMovieOrTv("tv")
                            } else {
                                setMovieOrTv("movies")
                            }
                        }}
                        label={show ? "Tv's" : "Movie"}
                    />
                </div>
            </div>
            <div className="d-flex w-100 flex-row flex-nowrap scroll">
                <div className="w-100 holder draggable">
                    <ListGroup className="list-group list-group-horizontal">
                        {(show === false) && <CreateCards url={moviesPupular} type={movie}></CreateCards>}
                        {(show === true) && <CreateCards url={tvPopular} type={tv} secType={movieOrTv}></CreateCards>}
                    </ListGroup>
                </div>
            </div>
        </section>
    )
}
