import React, { Component } from "react";
import Styles from "./Header.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("http://localhost:3000/auth-details");
      console.log(res);
      const user = res.data.user;
      this.setState({ user });
    } catch (er) {
      console.log(er);
    }
  }
  render() {
    return (
      <div className={Styles.Header}>
        <Link to="/" className={Styles.logo}>
          Blogster
        </Link>
        <ul>
          <nav className={Styles.ul}>
            {this.state.user ? (
              <nav>
                <Link to="/blogs">My Blogs</Link>
              </nav>
            ) : null}
            {!this.state.user ? (
              <a href="http://localhost:3000/auth/google">Login With Google</a>
            ) : (
              <a
                style={{ fontSize: "0.95rem" }}
                href="http://localhost:3000/logout"
              >
                {this.state.user.name}
              </a>
            )}
          </nav>
        </ul>
      </div>
    );
  }
}

export default Header;
