import React, { useState } from "react";

function QuestionForm({setQuestions}) {
  //shell to take in the data from the form
  //pulls in data the way the form is layed out...
  // converts it in the body of the post to the format in JSON file
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });


  function handleChange(event) {
    setFormData({
      //for each field carries the previous info typed in (from other fields)
      ...formData,
      //adds the name of the field (prompt, answer1, answer2, etc.): whats typed into the field
      //this gets placed in the useState for formData
      [event.target.name]: event.target.value,
    });
  }

  //this is the part where we post the formData into the existing DB
  //handleSubmit runs when the submit button is clicked
  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      //transfers the formData we pulled into the format where we store it in the database
      body: JSON.stringify({
        id: "",
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: formData.correctIndex,
      })
    })
    .then(r => r.json())
    //adds the new question data to the existing questions
    .then(newFormObj => {
      setQuestions(questions => [...questions, newFormObj])
    })
  }

  return (
    <section>
      <h1>New Question</h1>
      {/* form submittion sends in field values for post request */}
      {/* anything inside the form tag will be added to form submission */}
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
          // text type - any type of text can be typed into field
            type="text"
          //name of the field: used for event.target.name
            name="prompt"
            //value is set to the prompt of the form data
            //used for event.target.value
            value={formData.prompt}
            //handleChange uses event.target.name , event.target.value
            //adds both to the form data along with other fields
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
          //whichever option is selected from select tag, will be used as correctIndex
          //4 options are the 4 question options - we choose correct one from correct answer dropdown
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
