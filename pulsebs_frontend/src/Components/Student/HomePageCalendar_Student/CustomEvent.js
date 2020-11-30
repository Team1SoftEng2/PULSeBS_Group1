import React from 'react';

export default function customEvent(lecture) {
    return (

        <div>
            <p><b>{lecture.event.course}</b><br/>{lecture.event.professor}</p>
                {(lecture.event.mode === "present") ? lecture.event.room : "Virtual Classroom"}
        </div>
    );
}