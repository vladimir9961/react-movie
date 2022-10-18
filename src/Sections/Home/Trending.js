import { Form, ListGroup } from 'react-bootstrap'
import CreateCards from '../../Components/Cards/CreateCards';
import { useState } from 'react';
export default function PopularSection() {
    const [show, setShow] = useState(false)
    const [movieOrTv, setMovieOrTv] = useState(false)
    let trendingDay = "https://api.themoviedb.org/3/trending/movie/day?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1";
    let trandingWeek = "https://api.themoviedb.org/3/trending/movie/week?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1";
    const movie = "movie";
    return (
        <section className="holder-container">
            <div className="d-flex w-100 flex-row flex-nowrap scroll">
                <h2>Trending</h2>
                <div className="selector d-flex">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onClick={(e) => {
                            setShow(!show)
                            if (e.target.checked === true) {
                                setMovieOrTv("day")
                            } else {
                                setMovieOrTv("week")
                            }
                        }}
                        label={show ? "Week" : "Day"}
                    />
                </div>
            </div>
            <div className="d-flex w-100 flex-row flex-nowrap scroll">
                <div className="w-100 holder draggable scroll-wrapper">
                    <ListGroup className="list-group list-group-horizontal">
                        {(show === false) && <CreateCards url={trendingDay} type={movie}></CreateCards>}
                        {(show === true) && <CreateCards url={trandingWeek} type={movie} secType={"movies"}></CreateCards>}
                    </ListGroup>
                </div>
            </div>
        </section>
    )
}
