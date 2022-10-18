import { Form } from 'react-bootstrap'
import { useState } from 'react';
import TrailerCards from './TrailerCards';
export default function Latesttrailers() {
    const [show, setShow] = useState(false)
    const [movieOrTv, setMovieOrTv] = useState(false)

    const curentDate = new Date().toLocaleDateString('sv');
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('sv')
    const movies = `https://api.themoviedb.org/3/discover/movie?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&region=US&release_date.gte=${sevenDaysAgo}&release_date.lte=${curentDate}
    `;
    const tvs = `https://api.themoviedb.org/3/discover/tv?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&region=US&release_date.gte=${sevenDaysAgo}&release_date.lte=${curentDate}
    `;
    return (
        <section className="holder-container">
            <div className="d-flex w-100 flex-row flex-nowrap scroll">
                <h2>Latest Trailers</h2>
                <div className="selector d-flex">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onClick={(e) => {
                            setShow(!show)
                            if (e.target.checked === true) {
                                setMovieOrTv("tv")
                            } else {
                                setMovieOrTv("movie")
                            }
                        }}
                        label={show ? "tv" : "movie"}
                    />
                </div>
            </div>
            <div className="d-flex w-100 flex-row flex-nowrap scroll" id='triler-wraper'>

                {(show === false) && <TrailerCards url={movies} secType={"movie"}></TrailerCards>}
                {(show === true) && <TrailerCards url={tvs} secType={"tv"}></TrailerCards>}
            </div>
        </section >
    )
}
