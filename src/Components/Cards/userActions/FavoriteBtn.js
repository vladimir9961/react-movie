import { useState, useEffect } from 'react';
import Popup from '../../Popup';
let session = localStorage.getItem('session-id');
let accId = localStorage.getItem('user-id');
export default function FavoriteBtn(props) {
    let movieOrTv = props.type
    if (props.type == "movie") {
        movieOrTv = "movies"
    }
    const [alert, setAlert] = useState({
        variant: false,
        type: "",
        text: "",
    });
    const [color, setColor] = useState(false);
    const [newColor, setNewColor] = useState("")
    useEffect(() => {
        setColor(props.style.color)
    })
    async function checkIfInFavorite() {
        await fetch(`https://api.themoviedb.org/3/account/${accId}/favorite/${movieOrTv}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
            .then(res => res.json())
            .then((data) => {
                let obj = data.results.find(o => o.id == props.id);
                if (obj == undefined) {
                    favFetch(props.id, props.type, true)
                } else {
                    favFetch(props.id, props.type, false)
                }
            })
    }

    async function favFetch(id, type, bool) {
        await fetch(`https://api.themoviedb.org/3/account/${accId}/favorite?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                "media_type": type,
                "media_id": id,
                "favorite": bool
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.status_code === 1) {
                    setAlert({
                        ...alert,
                        variant: false,
                        type: "success",
                        text: "Item successfully added to favorite",
                    });
                    setNewColor(("pink"))
                } else {
                    setAlert({
                        ...alert,
                        variant: true,
                        type: "danger",
                        text: data.status_message,
                    });
                    setNewColor((""))
                }
            })
    }
    const callFetch = () => {
        checkIfInFavorite()
    }

    return (
        <div
            className='favorite-button'
            style={{ color: newColor ? newColor : color }}
            onClick={callFetch}
        >

            <Popup trigger={alert.variant} variant={alert.type} text={alert.text} />
        </div>
    )
}
