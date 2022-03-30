import React from "react";
import "./inbox.css";

const Welcome= (props) => {
    return (
        <div id="welcome">
            <div className="declare_welcome">
                <p>Welcome {props.f_n} {props.l_n}</p>
                <p id="log_to">Logging in to account</p>
            </div>
            <hr/>
            <div className="declare_to">
                <span>{props.email.split("@")[0]}</span>
            </div>
        </div>
    )
}

export default Welcome