import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { LectureList } from '../MyLecturesProfessor';


test("LectureList", () => {
    const lectures = [{
        lectureId: 'IS1010',
        courseId: 'IS001',
        teacherId: 'T37001',
        date: '12-12-2020 8:30',
        time: '8:30~10:00',
        mode: 'present'
    }];
    const renderResult = render(<LectureList lectures={lectures} history={null} setLectures={() => null} />);
    expect(renderResult.getByText('IS1010')).toBeInTheDocument();
    const modeButton = renderResult.getByText('present');
    fireEvent.click(modeButton);
    
})