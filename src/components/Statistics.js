import React, { useEffect, useState } from "react";
import "../styles/Statistics.css";

function Statistics(props) {
const [wpm, setWpm] = useState(0);
useEffect(() => {
    /** localStorage stores value locally under the defined key in this case HIGHSCORE */
    if(localStorage.getItem("HIGHSCORE") === null) {
        localStorage.setItem("HIGHSCORE", 0);
    }
    setWpm(Number(localStorage.getItem("HIGHSCORE")));
}, []);
    return (
        <React.Fragment>
            <div className="stat-box">
                <div>
                    Time Remaining: {props.time} secs
                </div>
                <div>
                    Best Speed: {wpm} WPM
                </div>
            </div>
        </React.Fragment>
    )
}

export default Statistics;
