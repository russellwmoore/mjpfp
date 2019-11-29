/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import moment from 'moment';
import DateTile from './DateTile';
import { connect } from 'react-redux';
import { weekdays, monthWeeks } from '../constants';


class CalendarView extends React.Component {

    //I'm choosing to build the dates array on the Calendar view instead of the App because the App
    //is subscribed to task state and will update everytime that changes as well
    buildDates() {
        const daysInMonth = moment(this.props.date).daysInMonth();
        let monthArr = monthWeeks;
        let wk = 0;
        for (let i = 1; i <= daysInMonth; i++) {
            const monthday = moment(this.props.date).date(i);
            const wkday = monthday.day();
            monthArr[wk][wkday] = monthday;
            if (wkday === 6) {
                ++wk;
            }
        }
        return monthArr;
    }

    render() {
        const monthArr = this.buildDates();
        return (
            <div id="calendar-view" className="cal-container">
                {
                    weekdays.map(day => <div key={day.slice(0, 3)} className="tile calHeader">{day}</div>)
                }
                {
                    monthArr.map(week => week.map(day =>
                        <div className="tile" key={`${week}-${Math.random() * 30}`}>
                            <DateTile key={`${week}-${Math.random() * 30}`} tileDate={day || ''} />
                        </div>))
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { calendar } = state;
    return {
        date: calendar.date,
    }
}

export default connect(mapStateToProps)(CalendarView);
