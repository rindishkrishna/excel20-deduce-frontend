import React, {useEffect, useState} from "react";
import Score from "./Score/Score";
import './ScoreBoard.scss'
import {get} from "../../../auth0/http";
import {API_ROOT} from "../../../auth0/api_config";

const ScoreBoard  = (props) => {

    const [scores,setScores] = useState();

    useEffect(()=>{
        get(`${API_ROOT}highscores`).then((res) => {
            setScores(res);
            props.setStart(true)
        });
    },[]);

    return(
        props.start &&
        <>
            <div className={"score-cover"}>

                    <div className={'score-heading'}>
                        <h1>High Scorers</h1>
                    </div>
                    <div className={"score-flex"}>
                        {scores?.map( (x,index) =>

                        <div className={"mb-2 score-flex-box flex-grow-1"}>
                            <Score index={index + 1} name={x.name} score={x.score} img={x.profile_picture}/>
                        </div>
                        )
                        }
                    </div>

            </div>
        </>
    )
};

export default ScoreBoard