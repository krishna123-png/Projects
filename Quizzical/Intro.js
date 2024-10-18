import React from "react"
import Quiz from "./Quiz.js"

export default function Intro() {
    
    const [clicked, setClicked] = React.useState(false); 
    
    function handleClick() {
        setClicked(true);
    }
    
   
     return (
        <div className="container">
            <div className="bg-image yellow">
                <img src="./images/blob.png" />
            </div>
            {clicked ? (<Quiz />) : (<div className="intro"><h1>Quizzical</h1><button onClick={handleClick}>Start quiz</button></div>)}
            <div className="bg-image white">
                <img src="./images/blob-2.png" />
            </div>
        </div>
    )
}