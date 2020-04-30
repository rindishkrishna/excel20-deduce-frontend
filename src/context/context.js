import React, {createContext, useState} from 'react';

export const Context = createContext();

function ContextProvider (props) {

    const [isAlert, setAlert] = useState(true);
    const [alertText, setText] = useState("");
    const [time, setTime] = useState();

    const Alert = (x, y) => {
        setText(x);
        setAlert(false);
        setTime(y);
    }

    return(
        <Context.Provider value={{isAlert, setAlert, alertText, setText, Alert, time, setTime}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;