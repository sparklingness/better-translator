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
      textAfterGoogleOrg: "",
      textAfterEnh: ""
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

    axios
      .all([
        this.translateGoogle(text, target),
        this.translatePapago(text, target)
      ])
      .then(
        axios.spread((respGoogle, respPapago) => {
          console.log("[+] axios.all :", respGoogle);
          console.log("[+] axios.all  :", respPapago);
        })
      )
      .catch(err => new Error(err));

    /*
    axios({
      url: "/translate",
      method: "post",
      data: {
        type: "GOOGLE",
        text: text, // document.getElementById("text-before").value,
        target: target
      }
    })
      .then(results => {
        console.log(results);

        this.setState({
          ...this.state,
          textAfterGoogleOrg: results.data
        });
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
    
    axios({
      url: "/translate",
      method: "post",
      data: {
        type: "PAPAGO",
        text: text,
        target: target
      }
    })
      .then(results => {
        console.log("[+] Papago : ", results);
      })
      .catch(err => {
        console.log(new Error(err));
      });
      */
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
      textAfterEnh: ""
    });
  }

  render() {
    return (
      <div id="input-container">
        <div id="text-input">
          <h2>Input</h2>
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
        <div id="text-google">
          <h2>Google Tranlation API</h2>
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
        <div>
          {/* <div id="text-before-enh"> {this.state.textBeforeEnh} </div> */}
        </div>
        <div />
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
