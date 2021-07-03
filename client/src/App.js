import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [emcode, setEmcode] = useState("");
  const [salary, setSalary] = useState("");

  const buttonClicked = () => {
    let url = "http://localhost:6060";
    
    Axios.post(`${url}/employees`, {
      EmpID: id,
      Name: name,
      EmpCode: emcode,
      Salary: salary,
    }).then(() =>{
      console.log('Success!!!');      
    })
  };

  return (
    <div className="container">
      <div className="row">
        <div className="title col-sm">
          <h1>Hello world!!</h1>
        </div>
      </div>
      <div className="form row">
        <div className="row">
          <div className="col-sm">
            <input
              type="text"
              name="EmpID"
              placeholder="id"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="Name"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="EmpCode"
              placeholder="code"
              onChange={(e) => {
                setEmcode(e.target.value);
              }}
            />
          </div>

          <div className="col-sm">
            <input
              type="text"
              name="Salary"
              placeholder="salary"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="submit-button col-sm">
            <button className="btn btn-primary" onClick={buttonClicked}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
