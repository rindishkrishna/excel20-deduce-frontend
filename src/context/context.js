import React, {createContext} from 'react';

export const Context = createContext();

function ContextProvider (props) {
    return(
        <Context.Provider value={{type : "help"}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;