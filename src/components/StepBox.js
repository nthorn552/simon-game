import React, { useState } from 'react';

const StepBox = (props) => {

    const [isActive, setActive] = useState(false);
    const classes = "step-box " + (props.value ? props.value : "") + (isActive ? " active" : "");
    let onClick, toggleActive = null;

    if (props.selectCallback != null) {
        onClick = () => props.selectCallback(props.value);
        toggleActive = () => setActive(!isActive);
    }

    return <div className={classes} onClick={onClick} onMouseDown={toggleActive} onMouseUp={toggleActive} ></div>
}

export default StepBox;