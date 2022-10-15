import { Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { FilterContext } from '../../Context/FilterContext';
import { useState } from 'react';
import SideBar from '../../Sections/Movies/SideBar';
import PopularTv from './Subpages/PopularTv';
import AiringToday from './Subpages/AiringToday'
import OnTv from './Subpages/OnTv'
import TopratedTv from './Subpages/TopRatedTv'
export default function Tv() {
    const [filtered, setFiltered] = useState(null);
    return (
        <Container
            className='movie-wrapper p-0'
            fluid
        >
            <FilterContext.Provider value={{ filtered, setFiltered }}>
                <Row
                    style={{ width: '100%' }}
                >
                    <Col className='col-3 col-xxl-2'>
                        <SideBar />
                    </Col>
                    <Col className='col-9 col-xxl-10'>
                        <Routes>
                            <Route path="popular" element={<PopularTv />} />
                            <Route path="airing_today" element={<AiringToday />} />
                            <Route path="on_tv/*" element={<OnTv />} />
                            <Route path="top_rated" element={<TopratedTv />} />
                        </Routes>
                    </Col>
                </Row>
            </FilterContext.Provider>
        </Container >
    )
}
