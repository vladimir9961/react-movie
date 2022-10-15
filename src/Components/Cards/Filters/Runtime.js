import { MenuItem } from 'react-pro-sidebar';
import RangeSlider from 'react-range-slider-input';
export default function Runtime(props) {
    const getValue = (e) => {
        props.func(e);
    }
    return (
        <MenuItem >
            <span>Runtime</span>
            <RangeSlider
                defaultValue={[0, 405]}
                min={0}
                max={405}
                step={15}
                onInput={(e) => getValue(e)}
            />
        </MenuItem>
    )
}