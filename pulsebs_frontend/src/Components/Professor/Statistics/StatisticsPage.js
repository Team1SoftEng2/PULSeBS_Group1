import React, { Component } from "react";
import { Picklist, Option } from 'react-rainbow-components';
import Statistics from './Statistics';

const weekAxis = 1;
const monthAxis = 2;

class statisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: '',
            authObj: this.props.authObj,
            courses: this.props.courses,
            lectures: this.props.lectures,
            bookings: this.props.bookings,
            events: [],
            professors: [],
          };
        };


    render() {
        return (
            <div id='StatisticsProfessorContainer'>
                <div>
                    <Picklist
                        onChange={course => this.setState({ course })}
                        value={this.state.course}
                        label="Select a Course">
                        <Option name="option 1" label="Experimental Building" />
                        <Option name="option 2" label="Empire State" />
                        <Option name="option 3" label="Central Park" />
                    </Picklist>
                </div>
                {(this.state.course === '') ? <div>
                </div> : <Statistics />
                }
            </div>
        );
    }
}

export default statisticsPage;