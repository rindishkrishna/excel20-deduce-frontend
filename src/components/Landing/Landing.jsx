import React from "react";
import './Landing.scss'
import Box from '../../assets/images/BOX.png'
// import Man from '../../assets/images/man-front.png'


const Landing = (props) => {


    return(
        <div className={"cover"}>
            {/*<div className={"triangle-black"}>*/}
            {/*</div>*/}
            {/*<div className={"button-red"}>*/}
            {/*    <div className={"button-text"}>*/}
            {/*        START GAME*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={"character"}>*/}
            {/*    <img src={Man} alt=""/>*/}
            {/*</div>*/}
            <div className={"box"}>
                <div className={"box-text"}>
                    <i>This is a sample text for the Game</i>
                </div>
                <div className={"green-button"} onClick={()=>props.history.push('/game')}>
                    <div>
                        START
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Landing;