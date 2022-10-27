import { MenuItem } from 'react-pro-sidebar';
import RangeSlider from 'react-range-slider-input';
export default function UserScore(props) {


    const getValue = (e) => {
        props.func(e);
    }
    return (
        <MenuItem >
            <span>User Score</span>
            <RangeSlider
                className="user-score"
                defaultValue={[0, 10]}
                min={0}
                max={10}
                onInput={(e) => getValue(e)}
            />
        </MenuItem>
    )
}
