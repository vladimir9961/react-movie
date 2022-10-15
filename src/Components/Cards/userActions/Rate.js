import Popup from '../../Popup';
import ReactStars from 'react-stars'
import { useEffect } from 'react';
import { useState } from 'react';
let session = localStorage.getItem('session-id');
export default function Rate(props) {
    const [alredyrated, setAlredyRated] = useState(false);
    const [newvalue, setNewValue] = useState(false)
    const [alert, setAlert] = useState({
        variant: false,
        type: "",
        text: "",
    });
    useEffect(() => {
        setAlredyRated(props.value)
    }, [])
    async function rateFetch(value, type, id) {
        let rated = await fetch(`https://api.themoviedb.org/3/${type}/${id}/rating?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                "value": value,
            })
        })
            .then(res => res.json())
            .then((data) => {
                setAlert({
                    ...alert,
                    variant: false,
                    type: "success",
                    text: data.status_message,
                });
                setNewValue(value)
            })
    }
    const ratingChanged = (value, type, id) => {
        rateFetch(value, type, id);
    }
    return (
        <>
            <Popup trigger={alert.variant} variant={alert.type} text={alert.text} />
            <ReactStars
                count={10}
                key-id={alredyrated.id}
                value={newvalue ? newvalue : props.value}
                type={alredyrated.type}
                onChange={(e) => {
                    ratingChanged(e, props.type, props.id);
                }}
                half={false}
                color2={'#ffd700'} />

        </>
    )
}