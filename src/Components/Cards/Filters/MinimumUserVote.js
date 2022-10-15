import { MenuItem } from 'react-pro-sidebar';
import RangeSlider from 'react-range-slider-input';
export default function MinimumUserVote(props) {
    const getValue = (e) => {
        props.func(e[1]);
    }
    return (
        <MenuItem >
            <span>Minimum User Votes</span>
            <RangeSlider
                id="range-slider"
                className="single-thumb"
                min={0}
                max={500}
                value={0}
                defaultValue={[0, 500]}
                step={50}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={true}
                onInput={(e) => getValue(e)}

            />
        </MenuItem>
    )
}
