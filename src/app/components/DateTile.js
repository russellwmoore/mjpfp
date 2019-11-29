import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class DateTile extends React.Component {

    render() {
        let dayTasks = [];
        const { tileDate, taskList} = this.props;
        const tileLabel = tileDate ? tileDate.date() : '';

        if (taskList.length) {
            dayTasks = taskList.filter(task => moment(task.date).isSame(tileDate, 'day'));
        }

        return (
            <div className="tile">
                <p>{tileLabel}</p>
                <ul>
                    {
                        dayTasks.map(task => <li key={task.id}>{task.description}</li>)
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { tasks } = state;
    return {
        taskList: tasks.taskList,
    }
}

export default connect(mapStateToProps)(DateTile);

