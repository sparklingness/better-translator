import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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
    this.translate = this.translate.bind(this);
    this.handleEnhancedTranslate = this.handleEnhancedTranslate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS);
    console.log(process.env.REACT_APP_ACCESS_TOKEN);
  }

  handleTranslate() {
    // document.getElementById("text-before").value = this.state.textInput;
    let text = document.getElementById("text-before").value;

    this.setState({
      ...this.state,
      textAfterOrg: text
    });

    this.translate(this.state.textAfterOrg);
  }

  handleInputText() {
    let text = document.getElementById("text-before").value;
    // let textForSelect = text.split(" ").map((v, i) => `<span>${v}</span>`);
    // let textBeforeEnhArea = document.getElementById("text-before-enh");
    // textBeforeEnhArea.appendChild(`<p> ${textForSelect} </p>`);

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

  translate(text) {
    const target = "ko";
    console.log(
      `[*] GOOGLE_APPLICATION_CREDENTIALS = ${
        process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIAL
      }, ACCESS_TOKEN = ${process.env.REACT_APP_ACCESS_TOKEN}`
    );
    axios({
      url: "https://translation.googleapis.com/language/translate/v2",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ya29.c.ElpiBtihciXyW27luqB46-j-C4Tflz27E8Ocf7C7wGOEY3KfPwk3D9162CnCdvgMvZ9gJ4IGWJ9ezIG0cB_s8dKhdXRiBUPjVJNRyjS_ZiRIVU9SbtMOTwOTba0`
      },
      data: {
        q: text, // document.getElementById("text-before").value,
        source: "en",
        target: target,
        format: "text"
      }
    })
      .then(results => {
        let translation = results.data.data.translations[0].translatedText;

        console.log("[+] Org :", text);
        console.log("[+] Eng :", translation);

        this.setState({ ...this.state, textAfterOrg: translation });
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }

  render() {
    return (
      <div id="input-container">
        <div>
          <textarea
            onChange={this.handleInputText}
            name="text-before"
            id="text-before"
            cols="50"
            rows="15"
            value={this.state.textBeforeOrg}
            textBeforeOrg={this.state.textBeforeOrg}
          />{" "}
          <div id="text-before-enh"> {this.state.textBeforeEnh} </div>{" "}
        </div>{" "}
        <div>
          <textarea
            name="text-after-org"
            id="text-after-org"
            cols="50"
            rows="15"
            value={this.state.textAfterOrg}
          />{" "}
          <textarea
            name="text-after-enh"
            id="text-after-enh"
            cols="50"
            rows="15"
            value={this.state.textAfterEnh}
          />{" "}
        </div>{" "}
        <button
          id="btn btn-translate"
          onClick={this.handleTranslate}
          className="btn btn-raised btn-success"
        >
          Translate{" "}
        </button>{" "}
        <button
          id="btn btn-clear"
          onClick={this.handleClear}
          className="btn btn-raised btn-secondary"
        >
          Clear{" "}
        </button>{" "}
      </div>
    );
  }
}

export default Input;
