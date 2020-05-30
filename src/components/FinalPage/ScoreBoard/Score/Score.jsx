import React from "react";
import './Score.scss'

const Score  = (props) => {
    const {index,name,score,img} = props;
    return(
        <>
            <div className={'d-flex col h-100 w-100 score-background flex-row'}>
                <div className={'pl-1'}>
                    <h1>{index}</h1>
                </div >
                <div className={'col'}>
                    <img src={img} className={"prof-img"} alt=""/>
                </div>
                <div className={'col'} >
                    <h4>{name}</h4>
                </div>
                <div className={'col'} >
                    <h2>{score}</h2>
                </div>
            </div>
        </>
    )
};

export default Score;