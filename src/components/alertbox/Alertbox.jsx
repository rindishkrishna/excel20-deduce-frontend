import React, {useContext} from 'react';
import {Context} from "../../context/context";
import './Alertbox.scss'

function Alertbox() {
    let x = useContext(Context);
    return(
        <div className={`alert-box ${x.isAlert ? "alert-out" : ""}`}>
            <div className="p cursor-default">
                <p>{x.alertText}</p>
            </div>
            <button onClick={()=>{
                x.setAlert(true);
                x.setText("");
            }} className="ok btn btn-primary">ok</button>
        </div>
    ) 
}

export default Alertbox;
