import React from 'react';
import './CSS/TeacherInput.css';



const TeacherTitle = (props)=> {

    return(
        <div>
            <p className="title-desc">{props.TitleDesc}</p>
        </div>
    );
}

export default TeacherTitle;