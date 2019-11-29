import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { setDate } from '../../redux/actions';
import { connect } from 'react-redux';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <h2>{moment(this.props.date).format("MMMM YYYY")}</h2>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
