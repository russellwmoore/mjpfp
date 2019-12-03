import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import TaskBlock from "./TaskBlock";
import { setTasks } from "../../redux/actions";

class DateTile extends React.Component {
  constructor() {
    super();
    this.state = {
      newTask: "",
      isHovering: false
    };
    this.handleHover = this.handleHover.bind(this);
  }
  //You'll love getting thunks happening here! After you move this async logic out of this component this code will read a lot quicker.
  async handleClick() {
    await axios.post(`/api/tasks/`, {
      description: this.state.newTask,
      date: this.props.tileDate
    });
    const updatedTasks = (
      await axios.get(
        `/api/tasks/${this.props.date.getFullYear()}/${this.props.date.getMonth()}`
      )
    ).data;
    this.props.setTasks(updatedTasks);
    this.setState({ newTask: "" });
  }

  handleHover() {
    const toggleHover = this.state.isHovering;
    this.setState({ isHovering: !toggleHover });
  }

  render() {
    let dayTasks = [];
    const { tileDate, taskList } = this.props;
    const tileLabel = tileDate ? tileDate.date() : "";

    if (taskList.length) {
      dayTasks = taskList.filter(task =>
        moment(task.date).isSame(tileDate, "day")
      );
    }

    if (tileDate) {
      return (
        <div
          className="date-tile"
          onMouseEnter={() => this.handleHover()}
          onMouseLeave={() => this.handleHover()}
        >
          <h4>{tileLabel}</h4>
          {dayTasks.map(task => (
            <TaskBlock key={task.id} task={task} />
          ))}
          {(this.state.isHovering || this.state.newTask) && (
            <div className="newtask-block">
              <input
                type="text"
                value={this.state.newTask}
                onChange={ev => this.setState({ newTask: ev.target.value })}
              />
              <button onClick={() => this.handleClick()}>Add New Task</button>
            </div>
          )}
        </div>
      );
    }

    //no date
    return <div className="date-tile"></div>;
  }
}

function mapStateToProps(state) {
  const { tasks, calendar } = state;
  return {
    taskList: tasks.taskList,
    date: calendar.date
  };
}

const mapDispatchToProps = {
  setTasks: taskList => setTasks(taskList)
};

export default connect(mapStateToProps, mapDispatchToProps)(DateTile);
