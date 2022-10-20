import { Container, DropdownButton, Dropdown, Row, Button, ButtonGroup } from 'react-bootstrap';
import Rate from './userActions/Rate';
import { useState, useEffect } from 'react';
import UserLists from './userActions/Lists';
import WatchlistBtn from './userActions/WatchlistBtn';
import FavoriteBtn from './userActions/FavoriteBtn'
let session = localStorage.getItem('session-id');
let accId = localStorage.getItem('user-id');
export default function DropdownActions({ id, type, secType, name }) {
    //SET MOVIES IF SECTYPE PROP IS EMPTY FOR FETCH
    if (secType === undefined) {
        secType = "movies"
    }
    const [existFavorite, setExistFavorite] = useState(false);
    const [existWatchlist, setExistWatchlist] = useState(false);
    const [rating, setRating] = useState(0);
    const [showlist, setShowList] = useState(false)
    const [showRate, setShowRate] = useState(false)
    const styles = {
        favorite: {
            color: existFavorite ? "pink" : "black"
        },
        watchlist: {
            color: existWatchlist ? "red" : "black"
        },
        list: {
            display: showlist ? "block" : "none"
        },
        rate: {
            display: showRate ? "flex" : "none"
        }
    }
    //CHECK IN RATED
    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/account/${accId}/rated/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&sort_by=created_at.asc&page=1`)
            .then(res => res.json())
            .then((data) => {
                let obj = data.results.find(o => o.id === id);
                if (obj != undefined) {
                    setRating(obj.rating);
                }
            })
    }, [])
    //CHECK EVERY CARD IF IT IS IN FAVORITE WATCHLIST OR RATED
    const checkItemExist = (e) => {
        const checkInFavorite = async () => {
            await fetch(`https://api.themoviedb.org/3/account/${accId}/favorite/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
                .then(res => res.json())
                .then((data) => {
                    let obj = data.results.find(o => o.id === id);
                    if (obj != undefined) {
                        setExistFavorite(true)
                    } else {
                        setExistFavorite(false)
                    }
                })
        }
        //CHECK IN WATCHLIST
        const checkInWatchlist = async () => {
            await fetch(`
           https://api.themoviedb.org/3/account/${accId}/watchlist/${secType}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&sort_by=created_at.asc&page=1`)
                .then(res => res.json())
                .then((data) => {
                    let obj = data.results.find(o => o.id === id);
                    if (obj != undefined) {
                        setExistWatchlist(true)
                    } else {
                        setExistWatchlist(false)
                    }
                })
        }
        checkInFavorite();
        checkInWatchlist();
    }
    //TOOTGLE ELEMENTS WITH LISTS
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
    //CHEK IF USER ALREDY DID SOME ACTION
    const callChekckItemExist = (e) => {
        if (e.target.ariaExpanded === "false") {
            checkItemExist()
        }
    }
    return (
        <DropdownButton
            align="end"
            as={ButtonGroup}
            title=""
            key-id={id}
            aria-label={name}
            onClick={(e) => callChekckItemExist(e)}
            key-type={type}
            autoClose={false}
            aria-labelledby={name}
        >
            {type !== "tv" && <Dropdown.Item
                eventKey="1"
                key-id={id}
                key-type={type}
                id="lists"
                aria-labelledby="add to list"
                onClick={(e) => displayContainerWithLists(e)}
            >Add to list
                <Container
                    fluid
                    style={styles.list}
                >
                    <Row>
                        <Button className='custom-btn' id="new-list-btn" aria-labelledby="create new list">Create new list</Button>
                    </Row>
                    <Row
                        className="row-lists"
                    >
                        <Container>
                            <UserLists
                                display={showlist}
                                id={id}
                            />
                        </Container>
                    </Row>
                </Container>
            </Dropdown.Item>}
            <Dropdown.Item
                eventKey="2"
                key-id={id}
                key-type={type}
                id="favorite"
            >
                <FavoriteBtn
                    aria-labelledby="add to favorite"
                    style={styles.favorite}
                    id={id}
                    type={type}
                    exist={existFavorite}
                />Add to favorite
            </Dropdown.Item>
            <Dropdown.Item
                eventKey="3"
                key-id={id}
                key-type={type}
                id="watchlist"
            >
                <WatchlistBtn
                    aria-labelledby="add to watchlist"
                    style={styles.watchlist}
                    id={id}
                    type={type}
                    exist={existWatchlist}
                />Add to watchlist
            </Dropdown.Item>
            <Dropdown.Item
                eventKey="4"
                key-id={id}
                key-type={type}
                id="rate"
                onClick={(e) => displayContainerWithStars(e)}
            >   Rate
                <Container
                    fluid
                    style={styles.rate}
                    className="rate-container"
                >
                    <Rate
                        id={id}
                        value={rating}
                        type={type}
                        aria-labelledby="add rate"
                    />
                </Container>
            </Dropdown.Item>

        </DropdownButton >
    )
}
