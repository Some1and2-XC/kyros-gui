import "./popup.css";
import { useState } from "react";

function Popup({ children, ...props }) {
    // Set props.out to jsx of display
    // Set props.onClick to add aditional events to onClick

    const [display, setDisplay] = useState(false);

    return (
        <div className="popup" onClick={() => {
            setDisplay(!display);
        }}>
            { children }
            <div className="popup-out">
                { props.out }
            </div>
        </div>
    );
}

export {Popup};
