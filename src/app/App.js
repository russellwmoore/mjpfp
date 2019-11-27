import React from 'react';
import CalendarView from './components/CalendarView';
import {
    setMonth,
    setYear
} from '../redux/actions';
import { connect } from 'react-redux';

class App extends React.Component {

    componentDidMount() {
        this.props.setYear(2019);
        this.props.setMonth("December");
    }

    render() {
        const { year, month} = this.props;
        if ( month && year) {
            return (
                <div id="app">
                    <CalendarView />
                </div>
            )
        }
        else {
            return (
                <div id="app">
                    Loading...
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { calendar } = state;
    return {
        year: calendar.year,
        month: calendar.month,
    }
}

const mapDispatchToProps = {
    setMonth: (month) => setMonth(month),
    setYear: (year) => setYear(year)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
