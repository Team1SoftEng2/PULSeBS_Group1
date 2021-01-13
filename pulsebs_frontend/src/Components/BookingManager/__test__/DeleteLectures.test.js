import DelLectures from '../DeleteLectures/DeleteLectures'

import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react';

import API from "../../../api/API";

jest.mock('react-router-dom',() => {
  return {
    useLocation: function() {
      return {
        pathname: "1/2/3/4/5/6",
        search: "",
        state: "1",
        hash: "1",
        key: "1"
      }
    }
  }
})

const lectures = [
  {
    lectureId: 'IS1003',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2021 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'IS1004',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'IS1005',
    courseId: 'IS002',
    teacherId: 't37002',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
];



test('DeleteLectures test', () => {
    API.getDelLecturesList = jest.fn(() =>{ return lectures})
    const getRender = render(<DelLectures />);
    const course = getRender.getByPlaceholderText('Courses name')
    fireEvent.change(course)  

    const date = getRender.getByPlaceholderText('Date of Birth')
    fireEvent.change(date) 

    
  });