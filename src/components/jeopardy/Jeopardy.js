import React, { Component } from 'react';

import JeopardyService from "../../services/jeopardyService";

class Jeopardy extends Component {
  constructor(props){
    super(props);

    this.client = new JeopardyService();
    this.state = {
      formData: {userAnswer: ""},
      data: {
        "id": null,
        "answer": "",
        "question": "",
        "value": null,
        "airdate": "",
        "created_at": "",
        "updated_at": "",
        "category_id": null,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": null,
          "title": "",
          "created_at": "",
          "updated_at": "",
          "clues_count": null,
        }
      },
      score: 0
    }
  }
  
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    const formData = {...this.state.formData};
    formData[event.target.name] = event.target.value;

    this.setState({ formData })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let value = Number(this.state.data.value)
    if (this.state.formData.userAnswer === this.state.data.answer) {
      this.setState((state) => ({
        score: state.score + value
      }))
    }
    else {
      this.setState((state) => ({
        score: state.score - value
      }))
    }
    this.resetForm()
    this.getNewQuestion()
  }

  resetForm = (event) => {
      this.setState({
          formData: {userAnswer: ""}
      })
  }

  render() {
    return (
      <div>
        <strong>User's Score: {this.state.score}</strong>
        <br />
        <strong>Question: {this.state.data.question}</strong>
        <br />
        <strong>Value: {this.state.data.value}</strong>
        <br />
        <strong>Category: {this.state.data.category.title}</strong>
        <br />
        <strong>Answer: {this.state.data.answer}</strong>
        <br />
        <form className="SubmitAnswer" onSubmit={this.handleSubmit}>
          <div>
            <label 
              htmlFor="userAnswer">Your Answer:
            </label>
            <input 
              type="text" 
              name="userAnswer"
              value={this.state.formData.userAnswer}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit Answer!</button>
        </form>
      </div>
    );
  }
}

export default Jeopardy;