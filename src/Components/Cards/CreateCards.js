import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Badge } from 'react-bootstrap';
import DropdownActions from './DropdownActions'
import PlaceHolder from './PlaceHolders/PlaceHolder';
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Link, Route, Routes } from "react-router-dom";
import Display from "../../Pages/Display/Display";
import Loading from "../LoadingCards/LoadingCards";
import { LazyLoadImage } from "react-lazy-load-image-component";
const CreateCards = (url) => {

    const navigate = useNavigate()
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [loading, setloading] = useState(true)
    const [pageNum, setpageNum] = useState(1)
    //FETCHING MOVIES AND TV'S TO DISPLAY CARDS
    useEffect(() => {
        setloading(true)
        const fetchData = async () => {
            const data = await fetch(url.url);
            const json = await data.json();
            return json;
        }
        fetchData()
            .then(data => {
                if (pageNum !== url.page) {
                    setpageNum(url.page)
                    setData(prev => [...prev, ...data.results]);
                } else {
                    setData(data.results)
                }
                setIsPending(false);
                setloading(false)
            })
    }, [url.url]);
    const handleClick = (id, type, name) => {
        const spaceReplace = name.replaceAll(' ', '-')
        navigate(`/display/${type}/${id}-${spaceReplace}`);
        navigate(0)
    }


    return (
        <>
            {isPending && <PlaceHolder />}
            {data && data.map((movie) => {
                return (
                    <ListGroup.Item style={{ border: 'none' }} className="text-white p-0 " key={movie.id}>
                        <Card style={{ border: 'none' }}>
                            <Link
                                onClick={(e) => handleClick(movie.id, url.type, movie.title || movie.name)}
                                aria-labelledby={movie.title || movie.name}
                                className="card-link"
                                aria-label={`${movie.title || movie.name}`}
                            />
                            <LazyLoadImage
                                className="card-img"
                                style={{ width: "200px", height: "300px" }}
                                src={movie.poster_path ? "https://www.themoviedb.org/t/p/w220_and_h330_face" + movie.poster_path : require('../../assets/images/placeholder-img.jpg')}
                                alt={movie.title || movie.name}
                                loading="lazy"
                            />
                            {/* DROPDOWN WITH STARS FAVORITES WATCHILIST AND LIST */}
                            {userInfo && <DropdownActions
                                id={movie.id}
                                type={url.type}
                                secType={url.secType}
                                role="button"
                                name={movie.title || movie.name}
                            />}
                            <Card.ImgOverlay>
                                <Badge
                                    id="card-rating"
                                >{movie.vote_average.toString().slice(0, 3)}

                                </Badge>
                                <Card.Title>{movie.title && movie.title || movie.name}</Card.Title>
                                <Card.Text>{movie.release_date && movie.release_date.slice(0, 4) || movie.first_air_date && movie.first_air_date.slice(0, 4)}</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </ListGroup.Item>
                );
            })}
            <Routes>
                <Route path="/display" element={<Display />} />
            </Routes>
            {loading &&
                <div className="loading">
                    <h1>
                        <Loading />
                    </h1>
                </div>}
        </>
    )
}
export default CreateCards;