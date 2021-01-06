import { fireEvent, render } from '@testing-library/react';
import SystemSetup from '../SystemSetup/SystemSetup';

test('Button test',()=>{
    const renderResult = render(<SystemSetup />);
    expect(renderResult.getByText('Students')).toBeInTheDocument();
    expect(renderResult.getByText('Professors')).toBeInTheDocument();
    expect(renderResult.getByText('Courses')).toBeInTheDocument();
    expect(renderResult.getByText('Enrollment')).toBeInTheDocument();
    expect(renderResult.getByText('Schedule')).toBeInTheDocument();
    expect(renderResult.getByText('Upload')).toBeInTheDocument();
    const StudentButton = renderResult.getByText('Students');
    fireEvent.click(StudentButton);
});

test ('Check uploaded files', async t => {
    // Here you will put test code.
    await t
        .setFilesToUpload('#upload-input', [
            '../Students.csv',
            '../Professors.csv',
            '../Courses.csv',
            '../Enrollment.csv',
            '../Schedule.csv'
        ])
        .click('#upload-btn');
    console.log(t);
});


test('Select correct file',()=>{
    
});