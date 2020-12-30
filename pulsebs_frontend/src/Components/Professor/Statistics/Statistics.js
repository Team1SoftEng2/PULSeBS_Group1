import React, { Component } from "react";
import { DatePicker } from 'react-rainbow-components';
import { VictoryChart, VictoryVoronoiContainer, VictoryTooltip, VictoryLabel, VictoryAxis, VictoryLine, VictoryHistogram } from 'victory';

const weekAxis = 1;
const monthAxis = 2;

class statistics extends Component {

  constructor(props) {
    super(props);
    this.state = {
        course: '',
        date: new Date(),
    };
}

  render() {
    return (
      <div id='StatisticsProfessorContainer'>
        <div>
        <DatePicker
            value={this.state.date}
            minDate={new Date(2019, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
            label="Select a date to check the Lecture Bookings"
            onChange={value => this.setState({ date: value })}
            locale = 'en-GB'
        />
        </div>
        <div className='ProfessorChartContainer'>
          <div>Weekly Bookings (average)</div>
          <VictoryChart domainPadding={{ x: 20 }}>
            <VictoryLine
              style={{
                data: { stroke: "#151A4F" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 'Week1', y: 2 },
                { x: 'Week2', y: 3 },
                { x: 'Week3', y: 5 },
                { x: 'Week4', y: 4 }
              ]}
            />
          </VictoryChart>
        </div>
        <div className='ProfessorChartContainer'>
          <div>Monthly Bookings (average)</div>
          <VictoryChart domainPadding={{ x: 20 }}>
            <VictoryLine
              style={{
                data: { stroke: "#151A4F" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 'Jan', y: 2 },
                { x: 'Feb', y: 3 },
                { x: 'Mar', y: 5 },
                { x: 'Apr', y: 4 },
                { x: 'Jun', y: 15 },
                { x: 'Jul', y: 2 },
                { x: 'Aug', y: 3 },
                { x: 'Sep', y: 5 },
                { x: 'Oct', y: 4 },
                { x: 'Nov', y: 15 },
                { x: 'Dec', y: 2 },
              ]}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default statistics;