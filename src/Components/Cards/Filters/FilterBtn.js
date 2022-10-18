import { Button } from 'react-bootstrap';
import { FilterContext } from '../../../Context/FilterContext';
import { useContext } from 'react';
export default function FilterBtn(props) {
    const { setFiltered } = useContext(FilterContext);
    const filter = () => {
        const { sort, from, runtime, to, type, userscore, uservote } = props.props
        const { genre } = props
        props.func(false);
        setFiltered(
            `https://api.themoviedb.org/3/discover/${type}?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&sort_by=${sort}&page=1&primary_release_date.gte=${from}&primary_release_date.lte=${to}&vote_count.gte=${uservote}&vote_average.gte=${userscore[0]}&vote_average.lte=${userscore[1]}&with_genres=${genre}&with_runtime.gte=${runtime[0]}&with_runtime.lte=${runtime[1]}&with_watch_monetization_types=flatrate`
        )
    }

    return (
        <Button id="filter-btn" onClick={filter}>Filter</Button>
    )
}
