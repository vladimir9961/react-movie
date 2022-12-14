import { Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Popular from './Subpages/Popular';
import Nowplaying from './Subpages/Nowplaying';
import TopRated from './Subpages/TopRated';
import Upcoming from './Subpages/Upcoming';
import SideBar from '../../Sections/Movies/SideBar';
import { FilterContext } from '../../Context/FilterContext';
import { useState } from 'react';
const Movies = () => {
    const [filtered, setFiltered] = useState(null);

    return (
        <Container
            className='movie-wrapper p-0'
        >
            <FilterContext.Provider value={{ filtered, setFiltered }}>
                <Row
                    className='m-0'
                    style={{ width: '100%' }}
                >
                    <Col className=' col-xxl-2 p-0 col-md-3 col-12'>
                        <SideBar />
                    </Col>
                    <Col className=' col-xxl-10 p-0 col-md-9 col-12'>
                        <main>
                            <Routes>
                                <Route path="popular" element={<Popular />} />
                                <Route path="now_playing" element={<Nowplaying />} />
                                <Route path="upcoming/*" element={<Upcoming />} />
                                <Route path="top_rated" element={<TopRated />} />
                            </Routes>
                        </main>
                    </Col>
                </Row>
            </FilterContext.Provider>
        </Container >
    )
}

export default Movies;