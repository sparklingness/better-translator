import React, { Component } from "react";
import "./App.css";
import Input from "./components/Input";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Better Translator</h1>
        <Input />
      </div>
    );
  }
}

export default App;
