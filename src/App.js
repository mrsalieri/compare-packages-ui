import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import RepoForm from "./RepoForm/RepoForm";
import RepoTable from "./RepoTable/RepoTable";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <RepoForm {...props} formName="Add Email" />}
          />
          <Route path="/:namespace/:name" component={RepoTable} />
          <Route component={RepoForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
