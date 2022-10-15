import { useEffect, useState } from "react"
import { SubMenu, MenuItem } from 'react-pro-sidebar';
const Genres = (props) => {
    const [genre, setgenre] = useState(null)
    let value = window.location.pathname;
    let idAndType = value.split(/[/-]/);
    let movieOrtv = idAndType[1]
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/${movieOrtv}/list?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US`)
            .then(res => res.json())
            .then((data) => {
                setgenre(data.genres)
            })
    }, [])
    const genres = (e, id) => {
        props.func(id);
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
        } else {
            e.target.classList.add('selected');

        }
    }
    return (
        <>
            <SubMenu label="Genres">
                {genre && genre.map(genre_item => {
                    return (
                        <MenuItem
                            key={genre_item.id}
                            key-id={genre_item.id}
                            onClick={(e) => genres(e, genre_item.id)}>
                            {genre_item.name}
                        </MenuItem>
                    )

                })}
            </SubMenu>
        </>
    )
}
export default Genres;