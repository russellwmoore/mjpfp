import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { setDate, setTasks } from '../../redux/actions';
import { connect } from 'react-redux';

class NavBar extends React.Component {

    async handleSooner(ev) {
        ev.preventDefault();
        const { date } = this.props;
        const newDate = moment(date).subtract(1, 'months').toDate();
        this.props.setDate(newDate);
        const updatedTasks = (await axios.get(`/api/tasks/${newDate.getFullYear()}/${newDate.getMonth()}`)).data;
        this.props.setTasks(updatedTasks);
    }

    async handleLater(ev) {
        ev.preventDefault();
        const { date } = this.props;
        const newDate = moment(date).add(1, 'months').toDate();
        this.props.setDate(newDate);
        const updatedTasks = (await axios.get(`/api/tasks/${newDate.getFullYear()}/${newDate.getMonth()}`)).data;
        this.props.setTasks(updatedTasks);
    }

    render() {
        return (
            <div className="navbar">
                <button onClick={ev => this.handleSooner(ev)}>{`<`}</button>
                {moment(this.props.date).format("MMMM YYYY")}
                <button onClick={ev => this.handleLater(ev)}>{`>`}</button>
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

const mapDispatchToProps = {
    setDate: (date) => setDate(date),
    setTasks: (taskList) => setTasks(taskList),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
