import React from 'react';
import './CSS/TeacherInput.css';



const Tinput = (props)=> {


    
       
    let TinputElement = <textarea 
                        className="Textarea"
                        rows={props.rows} cols={props.cols} 
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.changed}
                        />
       

       

    

    return(

        <div>
            <div>
                <label className="Teacher-Label">{props.label}</label>
            </div>


            <div>
                {TinputElement}            
            </div>
        </div>
    );
}

export default Tinput;