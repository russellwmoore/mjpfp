import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class DateTile extends React.Component {

    render() {
        let tileLabel = '';
        let dayTaskList = [];
        const { dateLabel, taskList} = this.props;
        if (dateLabel) {
            tileLabel = dateLabel.date();
        }
        if (taskList.length) {
            let tasks = taskList.find(day => moment(day.date).isSame(dateLabel, 'day'));
            console.log(tasks);
        }

        return (
            <div className="tile">
                <p>{tileLabel}</p>
                <ul>
                    {
                        
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

