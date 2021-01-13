import { render } from '@testing-library/react';
import React, { Component } from 'react'
import SystemSetup from '../SystemSetup/SystemSetup';

const testAuthObj = { authUser: "so47001", authErr: undefined, userRole: "supportOfficer" };

test('Button test',()=>{
    const renderResult = render(<SystemSetup authObj={testAuthObj} />);
    expect(renderResult.getByText('Select and Upload your file here')).toBeInTheDocument();
    expect(renderResult.getByText('Students')).toBeInTheDocument();
    expect(renderResult.getByText('Professors')).toBeInTheDocument();
    expect(renderResult.getByText('Courses')).toBeInTheDocument();
    expect(renderResult.getByText('Enrollment')).toBeInTheDocument();
    expect(renderResult.getByText('Schedule')).toBeInTheDocument();
    expect(renderResult.getByText('Upload')).toBeInTheDocument();
    
});

describe('FileUploadField', () => {
    const renderResult = render(<SystemSetup authObj={testAuthObj} />);
  
    test('should render a label and a file input field', () => {
      expect(component.find('input')).toExist();
      expect(component.find('label')).toExist();
    });
    
    it('should attach the label to the input field', () => {
      //const id = 'upload';
      expect(component.find('input').prop('id')).toBe('file');
      expect(component.find('button').prop('id')).toBe('upload');
    });
  
    it('should not show preview if no csv has been selected', () => {
      expect(component.find('csv')).not.toExist();
    });
  });