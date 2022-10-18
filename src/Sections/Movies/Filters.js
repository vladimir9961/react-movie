import { useEffect, useState } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import CalendarItem from '../../Components/Cards/Filters/Calendar';
import FilterBtn from '../../Components/Cards/Filters/FilterBtn';
import Genres from '../../Components/Cards/Filters/Genres'
import MinimumUserVote from '../../Components/Cards/Filters/MinimumUserVote';
import Runtime from '../../Components/Cards/Filters/Runtime';
import Sort from '../../Components/Cards/Filters/Sort';
import UserScore from '../../Components/Cards/Filters/UserScore'

export default function Filters() {
    const [filters, setfilters] = useState({
        sort: 'popularity.asc',
        userscore: ['0', '10'],
        uservote: ['0'],
        runtime: ['0', '405'],
        from: '',
        to: '',
        type: ''
    })
    useEffect(() => {
        let value = window.location.pathname;
        let idAndType = value.split(/[/-]/);
        let movieOrtv = idAndType[1]
        setfilters({
            ...filters,
            type: movieOrtv
        });

    }, [])

    const [genres, setGenres] = useState([])
    const [displayBtnFilter, setdisplayBtnFilter] = useState(false)
    const pull_sort = (data) => {
        setdisplayBtnFilter(true)
        setfilters({
            ...filters,
            sort: data
        })
    }
    const pull_dates = (fromDate, toDate) => {
        setfilters({
            ...filters,
            from: fromDate,
            to: toDate
        });
        setdisplayBtnFilter(true)
    }
    const pull_genres = (data) => {
        if (genres.indexOf(data) === -1) {
            genres.push(data)
            setdisplayBtnFilter(true)
        } else {
            setGenres((genres) =>
                genres.filter((prevItem) => prevItem !== data)
            );
        }
    }
    const pull_user_score = (data) => {
        setfilters({
            ...filters,
            userscore: data,
        });
        setdisplayBtnFilter(true)
    }
    const pull_user_vote = (data) => {
        setfilters({
            ...filters,
            uservote: data,
        });
        setdisplayBtnFilter(true)
    }
    const pull_runtime = (data) => {
        setfilters({
            ...filters,
            runtime: data,
        });
        setdisplayBtnFilter(true)
    }
    //RETURN TRUE IF BUTTON FILTER IS CLICKED TO HIDE
    const pull_clicked = (data) => {
        setdisplayBtnFilter(data)
    }
    return (
        <Menu>
            <Sort key='1' func={pull_sort} />
            <Genres key='3' func={pull_genres} />
            <CalendarItem key='2' func={pull_dates} />
            <UserScore key='4' func={pull_user_score} />
            <MinimumUserVote key='5' func={pull_user_vote} />
            <Runtime key='6' func={pull_runtime} />
            <MenuItem className='button-filter'>
                {displayBtnFilter ? <FilterBtn
                    func={pull_clicked}
                    props={filters}
                    genre={genres}
                /> : ""}
            </MenuItem>
        </Menu>
    )
}

