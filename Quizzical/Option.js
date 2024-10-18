import React from "react"

export default function Option(props) {
    let styles = {}
    
    if ((props.shallWeCheck) && (props.clicked) && (props.value === props.correct)) {
        styles = {
            backgroundColor: "#94D7A2"
        }
    }
    else if ((props.shallWeCheck) && (props.clicked) && (props.value !== props.correct)) {
        styles = {
            backgroundColor: "#f8bcbc"
        }
    }
    else if ((props.shallWeCheck) && (!props.clicked) && (props.value === props.correct)) {
        styles = {
            backgroundColor: "#94d7a2"
        }
    }
    else if ((props.shallWeCheck) && (!props.clicked) && (props.value !== props.correct)) {
        styles = {
            backgroundColor: "white"
        }
    }
    else if ((!props.shallWeCheck) && (props.clicked)) {
        styles = {
            backgroundColor: "#d6d8f5"
        }
    }
    else if ((!props.shallWeCheck) && (!props.clicked)) {
        styles = {
            backgroundColor: "white"
        }
    }
    
    return (
        <button style={styles} onClick={() => props.onClick(props.id)}>{props.value}</button>
    )
}