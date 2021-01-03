import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Picklist, Option } from 'react-rainbow-components';
import { DatePicker } from 'react-rainbow-components';
import { VictoryChart, VictoryLine, VictoryBar } from 'victory';
import moment from "moment";
import API from '../../../api/API';


const StatisticsPage = (props) => {

    let history = useHistory();
    let [course, setCourse] = useState({ name: props.courses[0].courseId, label: props.courses[0].name });
    let [date, setDate] = useState(new Date());
    let [bookings, setBookings] = useState([]);


    useEffect(() => {
        getBookings();
    }, [history, course]);



    async function getBookings() {
        API.getCourseBookings(course.name)
            .then((res) => {
                setBookings(res);
                console.log(res);
            })
            .catch((err) => {
                if (err.status && err.status === 401)
                    history.push('/');
                else
                    console.log(err);
            });
    }

    function getDaily(lookupdate) {
        let check = moment(lookupdate, 'DD-MM-YYYY');
        return bookings.filter(lecture => moment(lecture.date, 'DD-MM-YYYY').isSame(check))
            .reduce((acc, lecture) => acc + lecture.bookingsNumber, 0);
    }

    function getWeekly(lookupdate) {
        let weeklyBookings = bookings.filter(lecture => lookupdate.getFullYear() === moment(lecture.date, 'DD-MM-YYYY').toDate().getFullYear())
            .filter(lecture => moment(lookupdate).isoWeek() === moment(lecture.date, 'DD-MM-YYYY').isoWeek())
            .reduce((acc, lecture) => acc + lecture.bookingsNumber, 0);
        if (weeklyBookings === 0) return weeklyBookings;
        let weeklyLectures = bookings.filter(lecture => lookupdate.getFullYear() === moment(lecture.date, 'DD-MM-YYYY').toDate().getFullYear())
            .filter(lecture => moment(lookupdate).isoWeek() === moment(lecture.date, 'DD-MM-YYYY').isoWeek())
            .reduce((acc) => acc + 1, 0);
        if (weeklyLectures === 0) return weeklyLectures;
        return weeklyBookings / weeklyLectures;

    }

    function getMonthly(month, year) {
        let monthlyBookings = bookings.filter(lecture => year === moment(lecture.date, 'DD-MM-YYYY').toDate().getFullYear())
            .filter(lecture => month === moment(lecture.date, 'DD-MM-YYYY').toDate().getMonth())
            .reduce((acc, lecture) => acc + lecture.bookingsNumber, 0);
        if (monthlyBookings === 0) return monthlyBookings;
        let monthlyLectures = bookings.filter(lecture => year === moment(lecture.date, 'DD-MM-YYYY').toDate().getFullYear())
            .filter(lecture => month === moment(lecture.date, 'DD-MM-YYYY').toDate().getMonth())
            .reduce((acc) => acc + 1, 0);
        if (monthlyLectures === 0) return monthlyLectures;
        return monthlyBookings / monthlyLectures;
    }


    return (
        <div id='StatisticsProfessorContainer'>
            <div className='StatisticsInputContainer'>
                <Picklist
                    onChange={c => setCourse({ name: c.name, label: c.label })}
                    value={course}
                    label="Select Course">
                    {props.courses.map((c) => <Option name={c.courseId} label={c.name} />)}
                </Picklist>
                <div>
                    <DatePicker
                        value={date}
                        minDate={new Date(2019, 0, 1)}
                        maxDate={new Date(2025, 11, 31)}
                        label="Select Date"
                        onChange={value => setDate(moment(value).toDate())}
                        locale='en-GB'
                    />
                </div>
            </div>
            <div className='ProfessorChartContainer'>
                <div>Daily Bookings</div>
                <VictoryChart domainPadding={{ x: 20 }}>
                    <VictoryBar
                        domain={{ y: [0, 5] }}
                        style={{
                            data: {
                                stroke: "#151A4F",
                                fill: "#151A4F",
                            },
                        }}
                        data={[
                            { x: moment(date).subtract(3, 'days').toDate(), y: getDaily(moment(date).subtract(3, 'days').toDate()) },
                            { x: moment(date).subtract(2, 'days').toDate(), y: getDaily(moment(date).subtract(2, 'days').toDate()) },
                            { x: moment(date).subtract(1, 'days').toDate(), y: getDaily(moment(date).subtract(1, 'days').toDate()) },
                            { x: moment(date).toDate(), y: getDaily(moment(date).toDate()) },
                            { x: moment(date).add(1, 'days').toDate(), y: getDaily(moment(date).add(1, 'days').toDate()) },
                            { x: moment(date).add(2, 'days').toDate(), y: getDaily(moment(date).add(2, 'days').toDate()) },
                            { x: moment(date).add(3, 'days').toDate(), y: getDaily(moment(date).add(3, 'days').toDate()) }
                        ]}
                    />
                </VictoryChart>
            </div>
            <div className='StatisticsInputContainer'>
                <div className='ProfessorChartContainer'>
                    <div>Weekly Bookings (average)</div>
                    <VictoryChart domainPadding={{ x: 20 }}>

                        <VictoryLine
                            domain={{ y: [0, 5] }}
                            labels={({ datum }) => (datum.y !== 0)? datum.y.toFixed(2): null}
                            style={{
                                data: { stroke: "#151A4F" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 'Week' + moment(date).subtract(2, 'weeks').isoWeek(), y: getWeekly(moment(date).subtract(2, 'weeks').toDate()) },
                                { x: 'Week' + moment(date).subtract(1, 'weeks').isoWeek(), y: getWeekly(moment(date).subtract(1, 'weeks').toDate()) },
                                { x: 'Week' + moment(date).isoWeek(), y: getWeekly(moment(date).toDate()) },
                                { x: 'Week' + moment(date).add(1, 'weeks').isoWeek(), y: getWeekly(moment(date).add(1, 'weeks').toDate()) },
                                { x: 'Week' + moment(date).add(2, 'weeks').isoWeek(), y: getWeekly(moment(date).add(2, 'weeks').toDate()) }
                            ]}
                        />
                    </VictoryChart>
                </div>
                <div className='ProfessorChartContainer'>
                    <div>Monthly Bookings (average)</div>
                    <VictoryChart domainPadding={{ x: 20 }}>
                        <VictoryLine
                            domain={{ y: [0, 5] }}
                            labels={({ datum }) => (datum.y !== 0)? datum.y.toFixed(2): null}
                            style={{
                                data: { stroke: "#151A4F" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 'Jan', y: getMonthly(0, moment(date).toDate().getFullYear()) },
                                { x: 'Feb', y: getMonthly(1, moment(date).toDate().getFullYear()) },
                                { x: 'Mar', y: getMonthly(2, moment(date).toDate().getFullYear()) },
                                { x: 'Apr', y: getMonthly(3, moment(date).toDate().getFullYear()) },
                                { x: 'May', y: getMonthly(4, moment(date).toDate().getFullYear()) },
                                { x: 'Jun', y: getMonthly(5, moment(date).toDate().getFullYear()) },
                                { x: 'Jul', y: getMonthly(6, moment(date).toDate().getFullYear()) },
                                { x: 'Aug', y: getMonthly(7, moment(date).toDate().getFullYear()) },
                                { x: 'Sep', y: getMonthly(8, moment(date).toDate().getFullYear()) },
                                { x: 'Oct', y: getMonthly(9, moment(date).toDate().getFullYear()) },
                                { x: 'Nov', y: getMonthly(10, moment(date).toDate().getFullYear())},
                                { x: 'Dec', y: getMonthly(11, moment(date).toDate().getFullYear())},
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;