import React from "react"
import Question from "./Question.js"

export default function Quiz() {
    
    const[data, setData] = React.useState({});
    
    const[options, setOptions] = React.useState([]);
    
        /*[options, setOptions] = React.useState(data.results.map((element) => {
            const choices = [];
            const parser = new DOMParser()
            let doc = parser.parseFromString(element.correct_answer, 'text/html')
            choices.push(doc.documentElement.textContent)
            for (let i = 0; i < element.incorrect_answers.length; i++) {
                doc = parser.parseFromString(element.incorrect_answers[i], 'text/html')
                choices.push(doc.documentElement.textContent)
            }
            return choices
        }))
    }*/
    
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    
    const [isSwapped, setIsSwapped] = React.useState(false)
    
    const [attempts, setAttempts] = React.useState([])
    
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    
    const[countCorrect, setCountCorrect] = React.useState(0)
    
    const [playAgain, setPlayAgain] = React.useState(0)
    
    let questions = []
    let correct_answers = []
    let incorrect_answers = []
    let quiz = []
    
    React.useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
            .then((res) => res.json())
            .then((data) => setData(data))
    },[playAgain]);
    console.log(data)
    
    React.useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setOptions(data.results.map((element) => {
                const parser = new DOMParser()
                let doc = parser.parseFromString(element.correct_answer, 'text/html')
                const choices = []
                choices.push(doc.documentElement.textContent)
                for (let i = 0; i < element.incorrect_answers.length; i++) {
                    doc = parser.parseFromString(element.incorrect_answers[i], 'text/html')
                    choices.push(doc.documentElement.textContent)
                }
                for (let i = choices.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = choices[j]
                    choices[j] = choices[i]
                    choices[i] = temp
                }
                return choices
            }))
            setIsSwapped(true)
        }
    }, [data])
    
    React.useEffect(() => {
        if (selectedAnswers.length !== 0) {
            let count = 0;
            for (let i = 0; i < selectedAnswers.length; i++) {
                if (selectedAnswers[i].value === correct_answers[selectedAnswers[i].id - 1]) {
                    count++;
                }
            }
            setCountCorrect(count);
        }
    }, [selectedAnswers])
       
    function updateAttempts(id) {
        if (attempts.every((element) => element !== id)) {
            setAttempts((prev) => [...prev, id])
        }
    }
    
    function handleClick() {
        if (attempts.length === data.results.length) {
            setCheckAnswers((prev) => !prev)
        }
    }
    
    function updateSelectedAnswers(selected) {
        if (selectedAnswers.length === 0) {
            setSelectedAnswers((prev) => [...prev, selected])
        }
        else if (selectedAnswers.some((answer) => answer.id === selected.id)) {
            setSelectedAnswers((answers) => {
                const array = answers.map((answer) => {
                    if (answer.id === selected.id) {
                        return { id: answer.id, value: selected.value}
                    }
                    else {
                        return answer
                    }
                })
                return array;
            })
        }
        else {
            setSelectedAnswers((previous) => [...previous, selected])
        }
    }
     
     function oneMoreGame() {
        setData({})
        setOptions([])
        setCheckAnswers(false)
        setIsSwapped(false)
        setAttempts([])
        setSelectedAnswers([])
        setCountCorrect(0)
        setPlayAgain((prev) => prev + 1)
     }
     
     for (let i = 0; i < selectedAnswers.length; i++) {
        console.log(`id = ${selectedAnswers[i].id}`)
        console.log(`value = ${selectedAnswers[i].value}`)
     }
    
     console.log(`attempts -- length = ${attempts.length}`)
     console.log(`correct ones - ${countCorrect}`)
    if(Object.keys(data).length !== 0) {   
        questions = data.results.map((element) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(element.question, 'text/html')
            return doc.documentElement.textContent
        })
    
        correct_answers = data.results.map((element) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(element.correct_answer, 'text/html')
            return doc.documentElement.textContent
        })
    
        incorrect_answers = data.results.map((element) => {
            const incorrect = []
            for (let i = 0; i < element.incorrect_answers.length - 1; i++) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(element.incorrect_answers[i], 'text/html')
                incorrect.push(doc.documentElement.textContent)
            }
            return incorrect
        })
    
        quiz = questions.map((question, index) => {
            return <Question key={index + 1} id={index + 1} question={question} options=            {isSwapped ? options[index] : []} correct_answer={correct_answers[index]}   incorrect_answers={incorrect_answers[index]} shallWeSubmit={checkAnswers} updateAttempt={updateAttempts} updateChoice={updateSelectedAnswers} />
        })
    
        return (
            <div className="quiz--page">
                {quiz}
                <div className="submit--answers">
                    {attempts.length !== questions.length && <strong className="unattempted--questions--info">{`You have ${questions.length - attempts.length} unattempted answers`}</strong>}
                    {checkAnswers && <strong className="correctly--selected">{`You choose ${countCorrect}/${correct_answers.length} correct answers`}</strong>}
                    {checkAnswers ? <button className="play--again" onClick={oneMoreGame} >Play again</button> : <button className="check--answers" onClick={handleClick}>Check answers</button>}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="submit--answers"></div>
        )
    }
}