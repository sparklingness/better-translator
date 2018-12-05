import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Input.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textBeforeOrg: "",
      textBeforeEnh: "",
      textAfterOrg: "",
      textAfterEnh: ""
    };

    this.handleTranslate = this.handleTranslate.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.handleEnhancedTranslate = this.handleEnhancedTranslate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {}

  handleTranslate() {
    let text = document.getElementById("text-before-org").value;
    let result;
    const target = "ko";

    axios({
      url: "/translate",
      method: "post",
      data: {
        text: text, // document.getElementById("text-before").value,
        target: target
      }
    })
      .then(results => {
        console.log(results);

        this.setState({
          ...this.state,
          textAfterOrg: results.data
        });
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }

  handleInputText() {
    let text = document.getElementById("text-before-org").value;

    this.setState({
      ...this.state,
      textBeforeOrg: text
    });
  }

  handleEnhancedTranslate() {}

  handleClear() {
    this.setState({
      ...this.state,
      textBeforeOrg: "",
      textBeforeEnh: "",
      textAfterOrg: "",
      textAfterEnh: ""
    });
  }

  render() {
    return (
      <div id="input-container">
        <div>
          <textarea
            onChange={this.handleInputText}
            name="text-before-org"
            id="text-before-org"
            cols="70"
            rows="15"
            value={this.state.textBeforeOrg}
          />
          <textarea
            name="text-after-org"
            id="text-after-org"
            cols="70"
            rows="15"
            value={this.state.textAfterOrg}
          />

          <div id="text-before-enh"> {this.state.textBeforeEnh} </div>
        </div>
        <div>
          <textarea
            onChange={this.handleInputText}
            name="text-before-enh"
            id="text-before-enh"
            cols="70"
            rows="15"
            value={this.state.textBeforeEnh}
          />
          <textarea
            name="text-after-enh"
            id="text-after-enh"
            cols="70"
            rows="15"
            value={this.state.textAfterEnh}
          />
        </div>
        <button
          id="btn btn-translate"
          onClick={this.handleTranslate}
          className="btn btn-raised btn-success"
        >
          Translate
        </button>
        <button
          id="btn btn-clear"
          onClick={this.handleClear}
          className="btn btn-raised btn-secondary"
        >
          Clear
        </button>
      </div>
    );
  }
}

export default Input;
