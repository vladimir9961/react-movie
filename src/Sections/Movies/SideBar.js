import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import Filters from './Filters';

export default function SideBar() {
    const { collapseSidebar } = useProSidebar();

    return (
        <div
            className='sidebar-container'
            style={{ display: 'flex', height: 'fit-content' }}>
            <Sidebar>
                <Filters key='1' />
                <main>
                    <button onClick={() => collapseSidebar()}>Collapse</button>
                </main>
            </Sidebar>
        </div>
    )
}
