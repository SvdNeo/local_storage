import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const getData = () => {
    const data = localStorage.getItem("course");
    if (data) return JSON.parse(data);
    else return [];
  };
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [course, setCourse] = useState(getData());
  const addCourse = (e) => {
    e.preventDefault();
    setCourse([...course, { language, framework }]);
    setLanguage("");
    setFramework("");
  };
  useEffect(() => {
    localStorage.setItem("course", JSON.stringify(course)); // Corrected line
  }, [course]);
  return (
    <div className="App">
      <form onSubmit={addCourse}>
        <h1> Add Course</h1>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            type="text"
            className="form-control"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="framework" className="form-label">
            Framework
          </label>
          <input
            type="text"
            className="form-control"
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="container">
        {course.length > 0 && (
          <>
            <h1 className="mt-5">Course list</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Language</th>
                  <th scope="col">Framework</th>
                </tr>
              </thead>
              <tbody>
                {course.map((courses, index) => ( 
                  <tr key={index}> 
                    <td>{index}</td> 
                    <td>{courses.language}</td> 
                    <td>{courses.framework}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {course.length === 0 && <h4>No Course Added</h4>}
      </div>
    </div>
  );
}

export default App;
