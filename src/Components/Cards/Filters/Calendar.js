import React, { useEffect, useState } from "react";
import { MenuItem } from 'react-pro-sidebar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function CalendarItem(props) {
    let date = new Date()
    date.setDate(date.getYear() + 1);

    const [startDatePicked, setstartDatePicked] = useState(false);
    const [endDate, setEndDate] = useState(date);
    useEffect(() => {
        if (startDatePicked) {
            //FORMAT FROM DATE
            const yyyy = startDatePicked.getFullYear();
            let mm = startDatePicked.getMonth() + 1;
            let dd = startDatePicked.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            //RETURN FORMATED DATE FROM
            const formattedToday = yyyy + '-' + mm + '-' + dd;
            //FORMAT TO DATE
            const yyyyy = endDate.getFullYear();
            let mmmm = endDate.getMonth() + 1;
            let dddd = endDate.getDate();

            if (dddd < 10) dddd = '0' + dddd;
            if (mmmm < 10) mmmm = '0' + mmmm;
            //RETURN FORMATE TO DATE
            const formatedLastDay = yyyyy + '-' + mmmm + '-' + dddd;
            props.func(formattedToday, formatedLastDay)
        }
    }, [startDatePicked, endDate])

    return (
        <MenuItem
            id="calendar-item"
        >
            <div id="calendars">
                <span>
                    From:
                </span>
                <span>

                    <DatePicker
                        selected={startDatePicked}
                        onChange={(date) => setstartDatePicked(date)}
                        id="calendar"
                        autoComplete="off"
                    />
                </span>
            </div>
            <div id="calendars">
                <span>
                    To:
                </span>
                <span>
                    <DatePicker
                        selected={endDate}
                        autoComplete="off"
                        // onChange={(date) => setEndDate(date)}
                        onChange={(date) => setEndDate(date)}
                        id="calendar"
                    />
                </span>
            </div>
        </MenuItem>
    )
}
