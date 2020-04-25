import React, {createContext, useState} from 'react';

export const Context = createContext();

function ContextProvider (props) {

    const [isAlert, setAlert] = useState(true);
    const [alertText, setText] = useState("");

    const Alert = (x) => {
        setText(x);
        setAlert(false);
    }

    return(
        <Context.Provider value={{isAlert, setAlert, alertText, setText, Alert}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;