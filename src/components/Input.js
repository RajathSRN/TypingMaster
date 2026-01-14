import React from "react";
import "../styles/Input.css";

function Input() {
    return (
        <React.Fragment>
            <div>
                <input type="text" id="main-input" placeholder="Start typing here..." autoComplete="off" className="typing-input" />
            </div>
        </React.Fragment>
    );
}

export default Input;