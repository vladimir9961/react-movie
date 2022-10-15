import { useState, useEffect } from "react";
import Popup from '../../Popup';
let session = localStorage.getItem('session-id');
let accId = localStorage.getItem('user-id');
export default function UserLists(props) {
    const [lists, setLists] = useState(null);
    const [alert, setAlert] = useState({
        variant: false,
        type: "",
        text: "",
    });

    async function addToList(list, id, listname) {
        fetch(`https://api.themoviedb.org/3/list/${list}/add_item?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                "media_id": id,
            })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success === true) {
                    setAlert({
                        ...alert,
                        variant: false,
                        type: "success",
                        text: `Item successfully added to list ${listname}`,
                    })
                } else {
                    setAlert({
                        ...alert,
                        variant: false,
                        type: "danger",
                        text: data.status_message,
                    })
                }
            })
    }

    useEffect(() => {
        if (props.display) {
            fetch(`https://api.themoviedb.org/3/account/${accId}/lists?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&session_id=${session}&page=1`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setLists(data.results)
                })
        }
    }, [props])
    const test = (list, id, name) => {
        addToList(list, id, name);
    }
    return (
        <>
            <Popup trigger={alert.variant} variant={alert.type} text={alert.text} />
            {
                lists && lists.map(list => {
                    return (
                        <div
                            className="list-items"
                            key={list.id}
                            value={list.id}
                            name={list.name}
                            onClick={(e) => test(list.id, props.id, list.name)}
                        >
                            {list.name}{" "}
                            {'('}{list.item_count}{') items'}
                        </div>
                    )
                })
            }
        </>
    )

}

export function FetcList(listId, movieId) {


}
