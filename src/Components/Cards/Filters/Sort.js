import Form from 'react-bootstrap/Form';
import { MenuItem } from 'react-pro-sidebar';
export default function Sort(props) {
    const getValue = (e) => {
        props.func(e);
    }
    return (
        <MenuItem>
            Sort by:
            <Form.Select
                size="sm"
                onChange={e => getValue(e.target.value)}
            >
                <option value='popularity.asc'>
                    Popularity Ascending</option>
                <option value='popularity.desc'>Popularity Descending</option>
                <option value='release_date.asc'>Release Date Ascending</option>
                <option value='release_date.desc'>Release Date Descending</option>
                <option value='vote_average.asc'>Rating Ascending</option>
                <option value='vote_average.desc'>Rating Descending</option>
                <option value='original_title.asc'>Title (A-Z)</option>
                <option value='original_title.desc'>Title (Z-A)</option>
            </Form.Select>
        </MenuItem>
    )
}
