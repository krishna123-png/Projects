import React from "react"
import Option from "./Option.js"

export default function Question(props) {
    const [clicked, setClicked] = React.useState(null)
    const [attempted, setAttempted] = React.useState(false)
    
    React.useEffect(() => {
        if (clicked !== null) {
            setAttempted(true)
        }
    }, [clicked])
    
    React.useEffect(() => {
        if (attempted) {
            props.updateAttempt(props.id)
        }
    }, [attempted]);
    
    React.useEffect(() => {
        if (clicked !== null) {
            props.updateChoice({id: props.id,
            value: props.options[clicked - 1]})
        }
    }, [clicked])
    
    function handleClick(id) {
        setClicked(id)
    }
    
    if (props.options.length === 0) {
        return (
            <div className="options"></div>
        )
    }
    
    else {
        return (
            <div className="question">
                <h2>{props.question}</h2>
                <div className="options">
                    {props.options.map((option, index) => {
                        return <Option key={index + 1} id={index + 1} value={option} correct={props.correct_answer} clicked={clicked === index + 1} shallWeCheck={props.shallWeSubmit} onClick={handleClick} />
                    })}
                </div>
            </div>
        )
    }
}





