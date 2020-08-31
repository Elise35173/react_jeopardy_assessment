import React from 'react';

function GameDisplayOne (props) {
    return (
        <div className="GameDisplay">
            <strong>User's Score: {props.score}</strong>
            <br />
            <strong>Question: {props.question}</strong>
            <br />
            <strong>Value: {props.value}</strong>
            <br />
            <strong>Category: {props.category}</strong>
            <br />
            <strong>Answer: {props.answer}</strong>
            <br />
            <form className="SubmitAnswer" onSubmit={props.handleSubmit}>
                <div>
                    <label 
                    htmlFor="userAnswer">Your Answer:
                    </label>
                    <input 
                    type="text" 
                    name="userAnswer"
                    value={props.userAnswer}
                    onChange={props.handleChange}
                    />
                </div>
                <button>Submit Answer!</button>
            </form>
        </div>
    )
}

export default GameDisplayOne;