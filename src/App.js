// import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/E-Learning" component={Login} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/E-Learning/login" component={Login} exact />

          <Route path="/E-Learning/register" component={Register} exact />
          <Route path="/register" component={Register} exact />

          <Route path="*" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
