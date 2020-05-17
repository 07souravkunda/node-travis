import React, { Component } from "react";
import axios from "axios";

class BlogRead extends Component {
  constructor(props) {
    super(props);
    this.state = { blog: null };
  }
  async componentDidMount() {
    try {
      let blog = await axios.get(
        `http://localhost:3000/api/blogs/${this.props.match.params.id}`
      );

      blog = blog.data.data;
      console.log(blog);
      this.setState({ blog });
    } catch (er) {
      console.log(er);
    }
  }
  render() {
    console.log(this.props.match.params.id);
    console.log(this.state.blog);
    if (!this.state.blog) return null;
    return (
      <div style={{ width: "70%", margin: "auto", height: "100px" }}>
        <div style={{ width: "70%", margin: "auto", height: "100px" }}>
          {this.state.blog.title}
        </div>
        <div
          style={{
            width: "70%",
            margin: "auto",
            height: "100px",
            color: "black",
            fontSize: "large"
          }}
        >
          {this.state.blog.content}
        </div>
      </div>
    );
  }
}
export default BlogRead;
