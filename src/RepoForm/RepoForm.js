import React, { Component } from "react";
import axios from "axios";
import "./RepoForm.css";

class RepoForm extends Component {
  state = {
    submitting: false,
    repoName: "",
    repoNamespace: "",
    emailList: "",
    responseText: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    const stateObj = {};
    // Name of state params are equal to the name of the inputs
    stateObj[name] = value;

    this.setState(stateObj);
  };

  submitData = async () => {
    try {
      this.setState({ submitting: true });

      const { repoName, repoNamespace, emailList } = this.state;
      await axios({
        method: "post",
        url: `http://localhost:8054/api/repo/addemail`,
        data: {
          nameIn: repoName.trim(),
          namespaceIn: repoNamespace.trim(),
          emailListIn: emailList.split(",").map(val => val.trim())
        },
        timeout: 5000
      });

      this.setState({
        submitting: false,
        responseText: "success"
      });
    } catch (e) {
      this.setState({
        submitting: false,
        responseText: e.response.data.message
      });
    }
  };

  render() {
    const {
      submitting,
      repoName,
      repoNamespace,
      emailList,
      responseText
    } = this.state;

    return (
      <div className="RepoForm">
        <p>ADD NEW EMAIL TO REPO</p>
        <form>
          <input
            type="text"
            value={repoName}
            name="repoName"
            placeholder="Repo Name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={repoNamespace}
            name="repoNamespace"
            placeholder="Repo Namespace"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={emailList}
            name="emailList"
            placeholder="Emails to be added"
            onChange={this.handleChange}
          />
          <button disabled={submitting} onClick={this.submitData}>
            Update
          </button>
        </form>
        <p>{submitting ? "" : responseText}</p>
        <p>You can send multiple email addresses by separating with comma</p>
      </div>
    );
  }
}

export default RepoForm;
