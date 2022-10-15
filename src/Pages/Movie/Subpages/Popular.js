import CreateCards from '../../../Components/Cards/CreateCards';
import { ListGroup } from 'react-bootstrap';
import { FilterContext } from '../../../Context/FilterContext';
import { useContext, useEffect, useRef, useState } from 'react';
export default function Popular() {
    const [pageNum, setpageNum] = useState(1)
    const popular = `https://api.themoviedb.org/3/movie/popular?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&language=en-US&page=${pageNum}`;
    const filtered = useContext(FilterContext);
    const [filter, setFilter] = useState(popular)
    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight + 3 > scrollHeight) {
                setpageNum(prev => prev + 1)
            }
        }
    };


    useEffect(() => {
        setFilter(popular);
    }, [popular])
    useEffect(() => {
        setFilter(filtered.filtered);
    }, [filtered])
    return (
        <>
            <ListGroup
                className="list-group flex-wrap flex-row"
                onScroll={onScroll}
                ref={listInnerRef}
            >
                <CreateCards url={filter} type={"movie"} page={pageNum} />
            </ListGroup>
        </>
    )
}
