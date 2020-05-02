import './Doorboard.scss';
import React, {useEffect, useState, useContext, useRef} from 'react';
import Doorinfo from './doorinfo/Doorinfo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {API_ROOT} from '../../auth0/api_config';
import {get} from '../../auth0/http';
import {Context} from '../../context/context';

function Doorboard(props) {

    const cont = useContext(Context);


    const info = [{
        level_number : 21,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 20,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 19,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 18,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 17,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 16,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 15,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 14,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 13,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 12,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 11,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 10,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 9,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 8,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 7,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 6,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 5,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 4,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 3,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 2,
        unlocked_by : null,
        current : false,
        point : 300
    },{
        level_number : 1,
        unlocked_by : null,
        current : false,
        point : 300
    }]
    const [doorInfo, setDoor] = useState(info); 
    const mainDiv = useRef();
    const subDiv = useRef();
   
    useEffect(()=>{
        let currLevel = localStorage.getItem("level_number");
        setDoor(doorInfo => {
            return doorInfo.map(x=>{
                if(x.level_number === parseInt(currLevel)){
                    x.current = true;
                }else{
                    x.current = false;
                }
                return x;
            })
        });
        (async () => {
            let res = await get(`${API_ROOT}leaderboard`);
            console.log(res);
            res.forEach(r => {
                setDoor(doorInfo => {
                    return doorInfo.map(x=>{
                        if(x.level_number === r.level_number){
                            x.unlocked_by = r.unlocked_by;
                        }
                        return x;
                    })
                });
            });
        })();
    }, [cont]);

    useEffect(()=>{
        if(props.bor){
            if(subDiv.current){
                mainDiv.current.scrollTo({
                    top: subDiv.current.offsetTop,
                    behavior: 'smooth',
                  });
            }
        }
    }, [props.bor])

    return(
        <div ref={mainDiv} id="door-board" className={`bor cursor-default ${props.bor ? "bor-tra" : ""}`}>
            <div className={`toggle-2 cursor-pointer ${props.bor ? "togg-tra" : ""}`} onClick={() => props.toggle()}>
                <FontAwesomeIcon icon = {faAngleRight} />
            </div>
            {doorInfo.map(x => {
                if(x.current){
                    return(
                        <Doorinfo refer={subDiv} key={x.level_number} isOpen={x.unlocked_by} door={x.level_number} point={x.point} current={x.current} bor={props.bor} />
                    )
                }
                return (
                    <Doorinfo key={x.level_number} isOpen={x.unlocked_by} door={x.level_number} point={x.point} current={x.current} bor={props.bor} />
                )
            })}
        </div>
    );
}

export default Doorboard;