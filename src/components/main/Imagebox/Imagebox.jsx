import React from 'react';

function Imagebox(props) {
    return(
        <div className={`p-img ${props.three ? "pho-3" : ""}`} onClick={() => props.photo(props.image)}>
            <div className="clue d-flex justify-content-center">
                <img className="clue-img img-fluid mx-auto d-block" src={props.image} alt="" />
            </div>
        </div>
    );
}

export default Imagebox;