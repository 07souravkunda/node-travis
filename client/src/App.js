import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Blog from "./components/Blog/Blog";
import BlogRead from "./components/BlogRead/BlogRead";
import NewBlog from "./components/NewBlog/NewBlog";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/blogs/new" component={NewBlog} />
        <Route path="/blogs/:id" component={BlogRead} />
        <Route path="/blogs" component={Blog} />
        <Route
          path="/"
          component={() => (
            <div>
              <h1>Blogster!</h1>
              <div>Write Private Blogs</div>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
