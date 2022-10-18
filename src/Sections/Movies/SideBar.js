import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import Filters from './Filters';
import Button from 'react-bootstrap/Button';
import { useState, useLayoutEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
        width
    };
}
export default function SideBar() {
    const { collapseSidebar } = useProSidebar();
    const [collapse, setcollapse] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useLayoutEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        if (windowDimensions.width > 768) {
            setcollapse(false)
        } else {
            setcollapse(true)
        }

    }, [])
    return (
        <div
            className='sidebar-container'
            style={{ display: 'flex', height: 'fit-content' }}
        >
            <Sidebar
                defaultCollapsed={collapse}
            >
                <Filters key='1' />
            </Sidebar>
            <main className='main'>

                <Button
                    variant="danger"
                    onClick={() => collapseSidebar()}
                    id="btn-collapse"
                ></Button>
            </main>
        </div>
    )
}
