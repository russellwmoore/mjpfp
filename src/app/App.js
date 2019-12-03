import React from "react";
import moment from "moment";
import axios from "axios";
import CalendarView from "./components/CalendarView";
import { setDate, setTasks } from "../redux/actions";
import NavBar from "./components/NavBar";
import { connect } from "react-redux";

class App extends React.Component {
  async componentDidMount() {
    const initDate = new Date();
    this.props.setDate(initDate);
    const monthTasks = (
      await axios.get(
        `/api/tasks/${initDate.getFullYear()}/${initDate.getMonth()}`
      )
    ).data;
    this.props.setTasks(monthTasks);
  }

  render() {
    const { date } = this.props;
    if (date) {
      return (
        <div id="app">
          <NavBar />
          <CalendarView />
        </div>
      );
    } else {
      return <div id="app">Loading...</div>;
    }
  }
}

function mapStateToProps(state) {
  const { calendar } = state;
  return {
    date: calendar.date
  };
}

const _mapDispatchToProps = {
  setDate: date => setDate(date),
  setTasks: taskList => setTasks(taskList)
};

// a shortcut for this mapDispatch => Since the function you are defining in the object has the exact same arguments as the action creator you can simplify like this:
const verboseMapDispatchToProps = {
  setDate: setDate,
  setTasks: setTasks
};
//And since you are using the same funciton names as the action creator you can go further
const mapDispatchToProps = {
  setDate,
  setTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
