import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { setTasks } from "../../redux/actions";
class TaskBlock extends React.Component {
  async handleChange(ev) {
    await axios.put(`/api/tasks/${this.props.task.id}`, {
      complete: ev.target.checked
    });
    const updatedTasks = (
      await axios.get(
        `/api/tasks/${this.props.date.getFullYear()}/${this.props.date.getMonth()}`
      )
    ).data;
    this.props.setTasks(updatedTasks);
  }

  async handleSooner(ev) {
    // ev.preventDefault(); // Don't need these! preventing default behavior is only needed on buttons that are in forms.
    console.log("ev", ev.target.innerText);
    // You could also grab the innerText to give you a < or a > to dry up these 2 handle functions
    const { date } = this.props.task;
    await axios.put(`/api/tasks/${this.props.task.id}`, {
      date: moment(date)
        .subtract(1, "days")
        .toDate()
    });
    const updatedTasks = (
      await axios.get(
        `/api/tasks/${this.props.date.getFullYear()}/${this.props.date.getMonth()}`
      )
    ).data;
    this.props.setTasks(updatedTasks);
  }

  async handleLater(ev) {
    // ev.preventDefault();
    const { date } = this.props.task;
    await axios.put(`/api/tasks/${this.props.task.id}`, {
      date: moment(date)
        .add(1, "days")
        .toDate()
    });
    const updatedTasks = (
      await axios.get(
        `/api/tasks/${this.props.date.getFullYear()}/${this.props.date.getMonth()}`
      )
    ).data;
    this.props.setTasks(updatedTasks);
  }

  render() {
    const { task } = this.props;
    return (
      <div className="taskblock">
        <div className="inputs-block">
          <button
            onClick={ev => this.handleSooner(ev)}
            disabled={task.complete}
          >{`<`}</button>
          <button
            onClick={ev => this.handleLater(ev)}
            disabled={task.complete}
          >{`>`}</button>
        </div>
        <input
          type="checkbox"
          name="complete"
          value="true"
          defaultChecked={task.complete}
          onChange={ev => this.handleChange(ev)}
        />
        <span className={task.complete ? "completed-task" : "active-task"}>
          {task.description}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { calendar, tasks } = state;
  return {
    date: calendar.date,
    taskList: tasks.taskList
  };
}

const mapDispatchToProps = {
  setTasks: taskList => setTasks(taskList)
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBlock);
