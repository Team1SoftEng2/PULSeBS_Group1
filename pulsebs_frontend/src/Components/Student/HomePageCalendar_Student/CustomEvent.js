import React from 'react';

export default function customEvent(lecture) {
    return (
        <div className= {"CustomEventContainer " + (lecture.mode === "present")?(lecture.booked ? "Unbooked" : "Booked"): "Online"}>
            <h5>{lecture.title}</h5>
            <h5>{(lecture.mode === "present")?lecture.room: "Online"}</h5>
            <h5>{(lecture.mode === "present")?(lecture.booked ? "Unbooked" : "Booked"): ""}</h5>

        </div>
    );
}
