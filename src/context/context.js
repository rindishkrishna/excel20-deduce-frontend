import React, {createContext, useState} from 'react';

export const Context = createContext();

function ContextProvider (props) {

    const [isAlert, setAlert] = useState(true);
    const [alertText, setText] = useState("");
    const [time, setTime] = useState();
    const [isSolve,setIsSolve] = useState(false);

    const Alert = (x, y) => {
        if(x === "Correct answer!"){
            setText(x);
            setIsSolve(true);
            setTimeout(()=>{
                setAlert(false);
                setTime(y);
                setIsSolve(false)
            },3000)
        }
        else {
            setText(x);
            setAlert(false);
            setTime(y);
        }
    };

    return(
        <Context.Provider value={{isAlert,isSolve,setIsSolve, setAlert, alertText, setText, Alert, time, setTime}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;