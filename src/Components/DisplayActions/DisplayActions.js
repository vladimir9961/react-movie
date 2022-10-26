import FavoriteBtn from '../../Components/Cards/userActions/FavoriteBtn';
import UserLists from '../../Components/Cards/userActions/Lists';
import WatchlistBtn from '../../Components/Cards/userActions/WatchlistBtn';
import { Button, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Rate from '../Cards/userActions/Rate';
let session = localStorage.getItem('session-id');
let accId = localStorage.getItem('user-id');
export default function DisplayActions(props) {
    console.log(props)
    const [existFavorite, setExistFavorite] = useState(false);
    const [existWatchlist, setExistWatchlist] = useState(false);
    const [showlist, setShowList] = useState(false)
    const [rating, setRating] = useState(0);
    const [showRate, setShowRate] = useState(false)
    const styles = {
        favorite: {
            color: existFavorite ? "pink" : ""
        },
        watchlist: {
            color: existWatchlist ? "red" : ""
        },
        list: {
            display: showlist ? "block" : "none"
        },
        rate: {
            display: showRate ? "block" : "none"
        }
    }
    let secType = 'tv'
    if (props.type === 'movie') {
        secType = "movies"
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/account/${accId}/favorite/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
            .then(res => res.json())
            .then((data) => {
                let obj = data.results.find(o => o.id == props.id);
                if (obj != undefined) {
                    setExistFavorite(true)
                } else {
                    setExistFavorite(false)
                }
            })
        fetch(`
           https://api.themoviedb.org/3/account/${accId}/watchlist/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&sort_by=created_at.asc&page=1`)
            .then(res => res.json())
            .then((data) => {
                let obj = data.results.find(o => o.id == props.id);
                if (obj != undefined) {
                    setExistWatchlist(true)
                } else {
                    setExistWatchlist(false)
                }
            })
        fetch(`
        https://api.themoviedb.org/3/account/${accId}/rated/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&sort_by=created_at.asc&page=1`)
            .then(res => res.json())
            .then((data) => {
                let obj = data.results.find(o => o.id == props.id);
                if (obj != undefined) {
                    setRating(obj.rating);
                }
            })

    }, [])
    const displayContainerWithLists = (e) => {
        if (e.currentTarget === e.target) {
            setShowList((prevsetShowList) => !showlist)
        }
    }
    //DISPLAY CONTAINER STARS
    const displayContainerWithStars = (e) => {
        if (e.currentTarget === e.target) {
            setShowRate((prevsetShowList) => !showRate)
        }
    }
    return (
        <div
            className='user-interaction-btns d-flex'
        >
            {secType !== "tv" && <div
                key-id={props.id}
                key-type={secType}
                id="lists"
                onClick={(e) => displayContainerWithLists(e)}
            >
                <Container
                    fluid
                    style={styles.list}
                    id='display-list'
                >
                    <Row>
                        <Button>Create new list</Button>
                    </Row>
                    <Row
                        className="row-lists"
                    >
                        <Container>
                            <UserLists
                                display={showlist}
                                id={props.id}
                            />
                        </Container>
                    </Row>
                </Container>
            </div>}
            <FavoriteBtn
                style={styles.favorite}
                id={props.id}
                type={props.type}
                exist={false}
            />
            <WatchlistBtn
                style={styles.watchlist}
                id={props.id}
                type={props.type}
                exist={existWatchlist}
            />
            <div
                key-id={props.id}
                key-type={props.type}
                id="rate"
                onClick={(e) => displayContainerWithStars(e)}
            >
                <Container
                    fluid
                    style={styles.rate}
                    className="rate-container"
                >
                    <Rate
                        id={props.id}
                        value={rating}
                        type={props.type}

                    />
                </Container>
            </div>
        </div>
    )
}
