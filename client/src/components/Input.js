import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Input.css";
import Spinner from "./Spinner";
import { runInThisContext } from "vm";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTranslating: false,
      isTranslated: false,
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
    this.handleSelectWord = this.handleSelectWord.bind(this);
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
            isTranslated: true,
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
    let spanAddedText = text
      .split(" ")
      .map(v => `<span>${v}</span>`)
      .join(" ");

    let textEnh = document.getElementById("text-before-enh");
    textEnh.innerHTML = spanAddedText;

    this.setState({
      ...this.state,
      textBeforeOrg: text,
      textBeforeEnh: spanAddedText
    });
  }

  handleSelectWord(e) {
    e.persist();
    let selectedWord = e.target;

    selectedWord.style.color = "red";

    console.log("[+] handleSelectWord :", e);
    console.log("[+] handleSelectWord :", e.target.value);
  }

  handleEnhancedTranslate() {}

  handleClear() {
    this.setState({
      ...this.state,
      isTranslating: false,
      isTranslated: false,
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
          <div class="row">
            <div
              id="text-before-enh"
              className="boxed col-centered"
              width="100"
              onClick={this.handleSelectWord}
            />
          </div>
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

        {this.state.isTranslating ? (
          <div class="row">
            <div class="col-lg-1 col-centered">
              <Spinner
                type="balls"
                color="cyan"
                height="100px"
                width="100px"
                id="spinner-translate"
              />
            </div>
          </div>
        ) : (
          this.state.isTranslated && (
            <div id="text-after">
              <h2>Google Tranlation API</h2>
              <div id="text-google">
                <textarea
                  name="text-after-google-org"
                  id="text-after-google-org"
                  cols="50"
                  rows="10"
                  value={this.state.textAfterGoogleOrg}
                />
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
          )
        )}
      </div>
    );
  }
}

export default Input;
