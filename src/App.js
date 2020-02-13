import React, { Component, useState, useContext } from "react";
import { Form, TextArea, Button, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

const DataContext = React.createContext();

const ConversationHistoryComponent = props => {
  const { question, answer } = props;

  return (
    <div className="history-section">
      <Segment className="question-description" raised>
        {question}
      </Segment>
      <p className="answer-description">{answer}</p>
    </div>
  );
};
const ConversationHistoryContainer = () => {
  const providerData = useContext(DataContext);
  const { answerList } = providerData;
  return (
    <div className="conversation-history-conatiner section-content">
      {answerList.map((history, i) => {
        const historyAnswer = history.historyAnswer;
        const historyQuestion = history.historyQuestion;

        return (
          <ConversationHistoryComponent
            key={`converSationHistoryContent_${i}`}
            answer={historyAnswer}
            question={historyQuestion}
          />
        );
      })}
    </div>
  );
};
const AnswerComponent = props => {
  const { question } = props;
  const providerData = useContext(DataContext);
  const { providerEvent } = providerData;
  const [answerField, onChangeAnswerField] = useState("");

  const resetValue = () => {
    onChangeAnswerField("");
  };
  const onChangeValue = (event, data) => {
    const { value } = data;
    onChangeAnswerField(value);
  };
  const submitAnswer = () => {
    if (answerField.trim() !== "") {
      providerEvent.setNewAnswer(question, answerField);
      providerEvent.storeData();
      resetValue();
    }
  };
  return (
    <Form>
      <Segment className="question-description" raised>
        {question}
      </Segment>
      <Form.Group inline>
        <Form.Field className="input-answer">
          <TextArea rows={1} value={answerField} onChange={onChangeValue} />
        </Form.Field>
        <Form.Field className="btn-answer">
          <Button size={"large"} color={"blue"} onClick={submitAnswer}>
            回覆
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
const AnswerContainer = () => {
  const providerData = useContext(DataContext);
  const { questionList } = providerData;

  return (
    <div className="answer-conatiner section-content">
      {questionList.map((question, i) => {
        return (
          <AnswerComponent key={`answerContent_${i}`} question={question} />
        );
      })}
    </div>
  );
};
const QuestionContainer = () => {
  const providerData = useContext(DataContext);
  const { providerEvent } = providerData;
  const [questionField, onChangeQuestionField] = useState("");

  const resetValue = () => {
    onChangeQuestionField("");
  };
  const onChangeValue = (event, data) => {
    const { value } = data;
    onChangeQuestionField(value);
  };
  const submitQuestion = () => {
    if (questionField.trim() !== "") {
      providerEvent.setNewQuestion(questionField);
      providerEvent.storeData();
      resetValue();
    }
  };

  return (
    <div className="question-conatiner section-content">
      <Form>
        <Form.Field>
          <TextArea
            rows={8}
            placeholder="請輸入您的問題"
            value={questionField}
            onChange={onChangeValue}
          />
        </Form.Field>
        <Form.Field className="btn-question-container">
          <Button size={"large"} color={"blue"} onClick={submitQuestion}>
            發問
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

class App extends Component {
  state = {
    questionList: localStorage.getItem("database")
      ? JSON.parse(localStorage.getItem("database")).questionList
      : [],
    answerList: localStorage.getItem("database")
      ? JSON.parse(localStorage.getItem("database")).answerList
      : [],
    providerEvent: {
      setNewQuestion: value => this.setNewQuestion(value),
      setNewAnswer: (questionValue, answerValue) =>
        this.setNewAnswer(questionValue, answerValue),
      storeData: () => this.storeData()
    }
  };
  storeData() {
    const { questionList, answerList } = this.state;
    localStorage.setItem(
      "database",
      JSON.stringify({ questionList, answerList })
    );
  }
  setNewAnswer(questionValue, answerValue) {
    const { answerList } = this.state;
    answerList.unshift({
      historyQuestion: questionValue,
      historyAnswer: answerValue
    });
    this.setState(prevState => {
      const answerList = prevState.answerList;

      return {
        answerList
      };
    });
  }
  setNewQuestion(value) {
    const { questionList } = this.state;
    questionList.unshift(value);
    this.setState(prevState => {
      const questionList = prevState.questionList;

      return {
        questionList
      };
    });
  }

  render() {
    const { questionList, answerList } = this.state;

    return (
      <div className="main-content">
        <DataContext.Provider value={this.state}>
          <QuestionContainer />
          {Array.isArray(questionList) && questionList.length > 0 && (
            <AnswerContainer />
          )}
          {Array.isArray(answerList) && answerList.length > 0 && (
            <ConversationHistoryContainer />
          )}
        </DataContext.Provider>
      </div>
    );
  }
}

export default App;
