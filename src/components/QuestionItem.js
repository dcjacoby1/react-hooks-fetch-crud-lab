import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  //deconstructs the question array into individual variables
  const { id, prompt, answers, correctIndex } = question;

  //takes the question component and sets each one up as an option
  //map function sets the index as a unique identifier 
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //uses the question.id to select specific question to be deleted
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
    method: 'DELETE'
  })
  .then(r => r.json())
  //filters out the question we select, by only displaying the questions that don't equal the question...
  //id of the question linked to the delete button we selected
  .then(() => {
    const filteredQuestion = questions.filter(q => q.id !== question.id)
    //sets the questions to only display the filtered question
    setQuestions(filteredQuestion)
  })
  }

  // function handleCorrectAnswer(){
  //   fetch(`http://localhost:4000/questions/${question.id}`,{
  //     method: 'PATCH',
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({"correctIndex": integer})

  //   })
  //   .then(r => r.json())
  //   .then()

  // }


//sets up layout of quiz question
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
