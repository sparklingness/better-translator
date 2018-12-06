import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Input.css";
import Spinner from "./Spinner";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTranslating: false,
      textBeforeOrg: "",
      textBeforeEnh: "",
      textAfterGoogleOrg: "",
      textAfterGoogleEnh: "",
      textAfterPapagoOrg: "",
      textAfterPapagoEnh: ""
    };

    this.handleTranslate = this.handleTranslate.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.handleEnhancedTranslate = this.handleEnhancedTranslate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {}

  translateGoogle = (text, target) => {
    return axios({
      url: "/translate",
      method: "post",
      data: {
        type: "GOOGLE",
        text: text,
        target: target
      }
    });
  };

  translatePapago = (text, target) => {
    return axios({
      url: "/translate",
      method: "post",
      data: {
        type: "PAPAGO",
        text: text,
        target: target
      }
    });
  };

  handleTranslate() {
    let text = document.getElementById("text-before-org").value;
    let result;
    const target = "ko";

    this.setState({
      ...this.state,
      isTranslating: true
    });

    axios
      .all([
        this.translateGoogle(text, target),
        this.translatePapago(text, target)
      ])
      .then(
        axios.spread((respGoogle, respPapago) => {
          // axios.spread(respGoogle => {
          console.log("[+] axios.all - Google :", respGoogle.data);
          console.log(
            "[+] axios.all - Papago:",
            respPapago.data.message.result.translatedText
          );
          this.setState({
            ...this.state,
            textAfterGoogleOrg: respGoogle.data,
            textAfterPapagoOrg: respPapago.data.message.result.translatedText
          });

          this.setState({
            ...this.state,
            isTranslating: false
          });
        })
      )
      .catch(err => {
        console.log(err);
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
      textAfterGoogleOrg: "",
      textAfterGoogleEnh: "",
      textAfterPapagoOrg: "",
      textAfterPapagoEnh: ""
    });
  }

  render() {
    return (
      <div id="input-container">
        <div id="text-input">
          <h2>Original text</h2>
          <textarea
            onChange={this.handleInputText}
            name="text-before-org"
            id="text-before-org"
            cols="50"
            rows="10"
            value={this.state.textBeforeOrg}
          />
          <textarea
            onChange={this.handleInputText}
            name="text-before-enh"
            id="text-before-enh"
            cols="50"
            rows="10"
            value={this.state.textBeforeEnh}
          />
        </div>
        <div id="buttons">
          <button
            id="btn-translate"
            onClick={this.handleTranslate}
            className="btn btn-raised btn-success"
          >
            Translate
          </button>
          <button
            id="btn-clear"
            onClick={this.handleClear}
            className="btn btn-raised btn-secondary"
          >
            Clear
          </button>
        </div>
        <h2>Google Tranlation API</h2>
        <div id="text-google">
          {this.state.isTranslating ? (
            <Spinner type="bars" color="cyan" />
          ) : (
            <textarea
              name="text-after-google-org"
              id="text-after-google-org"
              cols="50"
              rows="10"
              value={this.state.textAfterGoogleOrg}
            />
          )}
          <textarea
            name="text-after-google-enh"
            id="text-after-google-enh"
            cols="50"
            rows="10"
            value={this.state.textAfterGoogleEnh}
          />
        </div>
        <div id="text-papago">
          <h2>Naver Papago API</h2>
          <textarea
            name="text-after-papago-org"
            id="text-after-papago-org"
            cols="50"
            rows="10"
            value={this.state.textAfterPapagoOrg}
          />
          <textarea
            name="text-after-papago-enh"
            id="text-after-papago-enh"
            cols="50"
            rows="10"
            value={this.state.textAfterPapagoEnh}
          />
        </div>
      </div>
    );
  }
}

export default Input;
