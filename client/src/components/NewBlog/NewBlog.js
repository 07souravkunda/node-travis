import React, { Component } from "react";
import Axios from "axios";

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = { submit: false, body: null };
  }
  render() {
    if (!this.state.submit)
      return (
        <div>
          <input placeholder="title" id="title"></input>
          <input placeholder="content" id="content"></input>
          <button
            onClick={async () => {
              const title = document.getElementById("title").value;
              const content = document.getElementById("content").value;
              if (title && content) {
                const body = { title, content };
                try {
                  const res = await Axios.post(
                    "http://localhost:3000/api/blogs",
                    body
                  );
                  this.setState({ submit: true, body });
                  console.log(res);
                } catch (er) {
                  console.log(er);
                }
              }
            }}
          >
            Create
          </button>
        </div>
      );
    return (
      <div>
        created
        <div>{this.state.body.title}</div>
        <div>{this.state.body.content}</div>
      </div>
    );
  }
}

export default NewBlog;
