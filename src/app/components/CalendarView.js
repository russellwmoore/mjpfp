import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { weekdays, monthWeeks } from '../constants';


class CalendarView extends React.Component {

    buildDates() {
        const selectedYear = this.props.year;
        const selectedMonth = moment().year(selectedYear).month(this.props.month);
        const daysInMonth = selectedMonth.daysInMonth();
        let monthArr = monthWeeks;
        let wk = 0;
        for (let i = 1; i <= daysInMonth; i++) {
            const wkday = selectedMonth.date(i).day();
            monthArr[wk][wkday] = i;
            if (wkday === 6) {
                ++wk;
            }
        }
        return monthArr;
    }

    render() {
        const monthArr = this.buildDates();
        return (
            <div id="calendar-container">
                <table>
                    <thead>
                        <tr>
                            {
                                weekdays.map(day => <th key={day.slice(0, 3)}>{day}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            monthArr.map(week => <tr key={week}>{week.map((day, idx) => <td key={`${week}-${idx}-${day}`}>{day || ''}</td>)}</tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { calendar } = state;
    return {
        year: calendar.year,
        month: calendar.month,
    }
}

export default connect(mapStateToProps)(CalendarView);
