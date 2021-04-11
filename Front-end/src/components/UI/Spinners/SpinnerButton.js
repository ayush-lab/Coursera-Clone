 import React from 'react';


 const SpinnerButton =(props)=>{



     return(
     <div>

    <button style={{opacity:"0.7"}}className={props.spinnerclass} type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
    </button>
    </div>);

 }

 export default SpinnerButton;