import React from "react";
import Styles from "./EachBlog.module.css";
import { Link } from "react-router-dom";

const eachBlog = props => {
  return (
    <div className={Styles.EachBlog}>
      <div className={Styles.title}>{props.title}</div>
      <div className={Styles.content}>{props.content}</div>
      <Link to={`/blogs/${props.id}`} style={{ color: "green" }}>
        Read
      </Link>
    </div>
  );
};

export default eachBlog;
