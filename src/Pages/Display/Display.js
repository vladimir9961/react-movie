import { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap';
import { ModalFrame } from '../../Components/Modal/Modal';
import DisplayActions from '../../Components/DisplayActions/DisplayActions';
import RecomendedCards from '../../Components/DisplayActions/RecomendedCards';
import Credits from '../../Components/DisplayActions/Credits';
import { ModalReviews } from '../../Components/Modal/ReviewsModal';

export default function Display() {
    let value = window.location.pathname;
    let idAndType = value.split(/[/-]/);
    let movieOrtv = idAndType[2]
    let id = idAndType[3]

    const [background, setbackground] = useState({});
    const [info, setinfo] = useState([])
    const [hours, sethours] = useState(0)
    //GET ALL INFO
    const getData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${movieOrtv}/${id}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&append_to_response=recommendations,videos,credits`)
            .then(res => res.json())
            .then((data) => {
                setbackground({ backgroundImage: `url(https://www.themoviedb.org/t/p/w1280${data.backdrop_path}` })
                setinfo(data)
                sethours(data.runtime);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return response
    }

    useEffect(() => {
        getData()
        return () => {
            getData()
        }
    }, [])

    return (
        <div
            className='full-width'
        >
            <div className='background-image' style={background && background}></div>
            <div className="background-col">
                <Container
                    className='holder-elements'
                >
                    <Col
                        style={{ height: '410px', display: 'grid' }}
                    >
                        <div className='title'>
                            <h2 className='text-white m-0'>{info.original_title || info.name}</h2>
                        </div>

                        <div className='text-white rate-date'>
                            <span>
                                <span className='average-vote'>       {String(info.vote_average).slice(0, 3)} |
                                </span>
                                <span> {info.vote_count}
                                </span>
                            </span>
                            {movieOrtv === "movie" ? <div>
                                <span>{Math.floor(hours / 60)}h</span>
                                <span>{Math.floor(hours % 60)}m</span>
                            </div> : ""}
                            {movieOrtv === "tv" ? <div>
                                <span>{info.number_of_episodes} Episodes </span>
                                <span>{info.number_of_seasons} Seasons</span>
                            </div> : ""}
                            {movieOrtv === "movie" ? <span>{String(info.release_date).slice(0, 4)}
                            </span> : <span>{String(info.first_air_date).slice(0, 4)} First time on tv
                            </span>}
                        </div>
                        <div className="genres">
                            {info.genres && info.genres.map(genre => {
                                return (<span
                                    key={genre.id}
                                    className='text-white fst-italic text-muted'
                                >
                                    {genre.name} </span>)
                            })}
                        </div>
                        <DisplayActions id={id} type={movieOrtv} />
                        <div className='overview'><h2 className='text-white'>Overview</h2>
                            <p className='text-white '>
                                {info.overview}
                            </p>
                        </div>
                        <div className='buttons'>
                            <ModalFrame
                                id={info.id}
                                name="Watch trailer"
                                type={movieOrtv == 'movie' ? 'movie' : 'tv'}
                                title="Watch Trailer"
                            />
                            <ModalReviews
                                name="Reviews"
                                id={info.id}
                                type={movieOrtv == 'movie' ? 'movie' : 'tv'}
                            />
                        </div>
                    </Col>
                    <Col
                        style={{ height: '410px', display: 'grid' }}
                    >
                        <RecomendedCards
                            data={info && info.recommendations}
                            type={movieOrtv}
                        />
                        <Credits data={info.credits && info.credits.cast} />
                    </Col>
                </Container>
            </div>
        </div >
    )
}