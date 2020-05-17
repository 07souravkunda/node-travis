import React, { Component } from "react";
import Styles from "./Blog.module.css";
import EachBlog from "./EachBlog/EachBlog";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
  }
  async componentDidMount() {
    try {
      let blogs = await axios.get("http://localhost:3000/api/blogs");
      console.log(blogs);
      blogs = blogs.data.data;
      this.setState({ blogs });
    } catch (er) {
      console.log(er);
    }
  }
  render() {
    return (
      <div className={Styles.Blog}>
        {this.state.blogs.map(el => {
          return (
            <EachBlog
              key={el._id}
              id={el._id}
              title={el.title}
              content={el.content}
            />
          );
        })}

        <Link className={Styles.float_btn} to="/blogs/new">
          <IoIosAdd className={Styles.IoIosAdd} />
        </Link>
      </div>
    );
  }
}

export default Blog;
