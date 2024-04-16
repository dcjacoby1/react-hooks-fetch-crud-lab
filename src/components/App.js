import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  //use state for changing page
  const [page, setPage] = useState("List");
  //use state for filling questions
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    //get requests for questions 
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    //fill questions with DB questions
    .then(data => setQuestions(data))

  },[])




  return (
    <main>
      {/* passes use state for which page to display, based on what is clicked in Navbar */}
      <AdminNavBar onChangePage={setPage} />
      {/* uses Navbar buttons to decide which page to display */}
      {page === "Form" ? <QuestionForm setQuestions={setQuestions} /> : <QuestionList questions={questions} setQuestions={setQuestions}/>}
    </main>
  );
}

export default App;
