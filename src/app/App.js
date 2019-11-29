import React from 'react';
import moment from 'moment';
import axios from 'axios';
import CalendarView from './components/CalendarView';
import {
    setDate,
    setTasks
} from '../redux/actions';
import { connect } from 'react-redux';

class App extends React.Component {

    async componentDidMount() {
        const initDate = new Date();
        this.props.setDate(initDate);
        const monthTasks = (await axios.get(`/api/tasks/${initDate.getFullYear()}/${initDate.getMonth()}`)).data;
        this.props.setTasks(monthTasks);
    }

    render() {
        const { date } = this.props;
        if ( date ) {
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
        date: calendar.date,
    }
}

const mapDispatchToProps = {
    setDate: (date) => setDate(date),
    setTasks: (taskList) => setTasks(taskList),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
