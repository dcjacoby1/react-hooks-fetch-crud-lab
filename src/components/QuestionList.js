import React from "react";
import QuestionItem from "./QuestionItem";

//data from get request passed down as a prop
function QuestionList({questions, setQuestions}) {
  //questions data broken down by question
  const mappedQuestions = questions.map(question => <QuestionItem key={question.id} question={question} questions={questions} setQuestions={setQuestions}/>)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{mappedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
