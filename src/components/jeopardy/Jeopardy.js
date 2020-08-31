import React, { Component } from 'react';

import JeopardyService from "../../services/jeopardyService";
import GameDisplayOne from '../gameDisplay/GameDisplayOne';
import GameDisplayTwo from '../gameDisplay/GameDisplayTwo';
import GameDisplayThree from '../gameDisplay/GameDisplayThree';

class Jeopardy extends Component {
  constructor(props){
    super(props);

    this.client = new JeopardyService();
    this.state = {
      revealOne: false,
      revealTwo: false,
      revealThree: false,
      formData: {userAnswer: ""},
      dataOne: {
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
      dataTwo: {
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
      dataThree: {
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
        dataOne: result.data[0], 
        dataTwo: result.data[1],
        dataThree: result.data[2]
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

  handleSubmitOne = (event) => {
    event.preventDefault();
    let userAnswerOne = (this.state.formData.userAnswer).toLowerCase()
    let dataAnswerOne = (this.state.dataOne.answer).toLowerCase()
    let valueOne = Number(this.state.dataOne.value)
    if (userAnswerOne === dataAnswerOne) {
      this.setState((state) => ({
        score: state.score + valueOne
      }))
    }
    else if (userAnswerOne !== dataAnswerOne) {
      this.setState((state) => ({
        score: state.score - valueOne
      }))
    }
    this.resetForm()
    this.getNewQuestion()
  }

  handleSubmitTwo = (event) => {
    event.preventDefault();
    let userAnswerTwo = (this.state.formData.userAnswer).toLowerCase()
    let dataAnswerTwo = (this.state.dataTwo.answer).toLowerCase()
    let valueTwo = Number(this.state.dataTwo.value)
    if (userAnswerTwo === dataAnswerTwo) {
      this.setState((state) => ({
        score: state.score + valueTwo
      }))
    }
    else if (userAnswerTwo !== dataAnswerTwo) {
      this.setState((state) => ({
        score: state.score - valueTwo
      }))
    }
    this.resetForm()
    this.getNewQuestion()
  }

  handleSubmitThree = (event) => {
    event.preventDefault();
    let userAnswerThree = (this.state.formData.userAnswer).toLowerCase()
    let dataAnswerThree = (this.state.dataThree.answer).toLowerCase()
    let valueThree = Number(this.state.dataThree.value)
    if (userAnswerThree === dataAnswerThree) {
      this.setState((state) => ({
        score: state.score + valueThree
      }))
    }
    else if (userAnswerThree !== dataAnswerThree) {
      this.setState((state) => ({
        score: state.score - valueThree
      }))
    }
    this.resetForm()
    this.getNewQuestion()
  }

  resetForm = (event) => {
      this.setState({
          formData: {userAnswer: ""},
          revealOne: false,
          revealTwo: false,
          revealThree: false,
      })
  }

  revealQuestionOne = (event) => {
    this.setState({
      revealOne: true
    })
  }

  revealQuestionTwo = (event) => {
    this.setState({
      revealTwo: true
    })
  }

  revealQuestionThree = (event) => {
    this.setState({
      revealThree: true
    })
  }

  render() {
    if(this.state.dataOne.category && this.state.dataTwo.category && this.state.dataThree.category) {
      let categoryOne = <button onClick={this.revealQuestionOne}>{this.state.dataOne.category.title}</button>
      let categoryTwo = <button onClick={this.revealQuestionTwo}>{this.state.dataTwo.category.title}</button>
      let categoryThree = <button onClick={this.revealQuestionThree}>{this.state.dataThree.category.title}</button>
      if (this.state.revealOne) {
        return (
          <div className="Jeopardy">
            <GameDisplayOne
              score={this.state.score}
              question={this.state.dataOne.question}
              value={this.state.dataOne.value}
              category={this.state.dataOne.category.title}
              answer={this.state.dataOne.answer}
              handleSubmit={this.handleSubmitOne}
              userAnswer={this.state.formData.userAnswer}
              handleChange={this.handleChange}
            />
          </div>
        )
      }
      if (this.state.revealTwo) {
        return (
          <div className="Jeopardy">
            <GameDisplayTwo
              score={this.state.score}
              question={this.state.dataTwo.question}
              value={this.state.dataTwo.value}
              category={this.state.dataTwo.category.title}
              answer={this.state.dataTwo.answer}
              handleSubmit={this.handleSubmitTwo}
              userAnswer={this.state.formData.userAnswer}
              handleChange={this.handleChange}
            />
          </div>
        )
      }
      if (this.state.revealThree) {
        return (
          <div className="Jeopardy">
            <GameDisplayThree
              score={this.state.score}
              question={this.state.dataThree.question}
              value={this.state.dataThree.value}
              category={this.state.dataThree.category.title}
              answer={this.state.dataThree.answer}
              handleSubmit={this.handleSubmitThree}
              userAnswer={this.state.formData.userAnswer}
              handleChange={this.handleChange}
            />
          </div>
        )
      }
      return (
        <div className="Jeopardy">
          {this.state.score}
          {categoryOne}
          <br />
          {categoryTwo}
          <br />
          {categoryThree}
        </div>
      );
    }
  }
}

export default Jeopardy;