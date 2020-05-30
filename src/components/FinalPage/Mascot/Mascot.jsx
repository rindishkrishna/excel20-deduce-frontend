import React, {useState} from "react";
import Avatar from '../../../assets/images/mascot.png'
import './Mascot.scss'
import ScoreBoard from "../ScoreBoard/ScoreBoard";


const Mascot  = () => {
    const [starts,setStarts] = useState(false);

    return(
        <>

            <div className={" avatar-cover position-relative"}>
            {starts &&
                <img src={Avatar} className={"avatar"} alt=""/>
            }
            <ScoreBoard start={starts} setStart={setStarts} />
            </div>
        </>
    )
};

export default Mascot