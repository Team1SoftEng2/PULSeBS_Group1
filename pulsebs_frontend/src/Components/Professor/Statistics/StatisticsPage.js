import React, { Component } from "react";
import { Picklist, Option } from 'react-rainbow-components';
import { DatePicker } from 'react-rainbow-components';
import { VictoryChart, VictoryLine, VictoryBar } from 'victory';
import moment from "moment";

class statisticsPage extends Component {

    state = {
        course: { name: 'option 1', label: 'Course1' },
        date: new Date(),
    };

    render() {
        return (
            <div id='StatisticsProfessorContainer'>
                <div className='StatisticsInputContainer'>
                    <Picklist
                        onChange={course => this.setState({ course })}
                        value={this.state.course}
                        label="Select a Course">
                        <Option name="option 1" label="Course1" />
                        <Option name="option 2" label="Course2" />
                        <Option name="option 3" label="Course3" />
                    </Picklist>
                    <div>
                        <DatePicker
                            value={this.state.date}
                            minDate={new Date(2019, 0, 1)}
                            maxDate={new Date(2025, 11, 31)}
                            label="Select a date"
                            onChange={value => this.setState({ date: value })}
                            locale='en-GB'
                        />
                    </div>
                </div>
                <div className='ProfessorChartContainer'>
                    <VictoryChart domainPadding={{ x: 20 }}>
                        <VictoryBar
                            style={{
                                data: { stroke: "#151A4F",
                                fill: "#151A4F",
                            },
                            }}
                            data={[
                                { x: moment(this.state.date).subtract(3, 'days').toDate(), y: 1 },
                                { x: moment(this.state.date).subtract(2, 'days').toDate(), y: 2 },
                                { x: moment(this.state.date).subtract(1, 'days').toDate(), y: 3  },
                                { x: moment(this.state.date).toDate(), y: 4 },
                                { x: moment(this.state.date).add(1, 'days').toDate(), y: 5 },
                                { x: moment(this.state.date).add(2, 'days').toDate(), y: 6 },
                                { x: moment(this.state.date).add(3, 'days').toDate(), y:7 }
                            ]}
                        />
                    </VictoryChart>
                </div>
                <div className='StatisticsInputContainer'>
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
            </div>
        );
    }
}

export default statisticsPage;