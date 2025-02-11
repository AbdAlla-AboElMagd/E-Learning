import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPanel from './adminpanel/AdminPanel'


import AddCourse from "./adminpanel/api/AddCours";
import ListCourses from "./adminpanel/api/ListCourses";
import NotFound from './adminpanel/pages/NotFound';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
        <Route path="/E-Learning/dashboard" component={AdminPanel} exact/>


          <Route path="/" component={Login} exact />
          <Route path="/E-Learning" component={AdminPanel} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/E-Learning/login" component={Login} exact />

          <Route path="/E-Learning/register" component={Register} exact />
          <Route path="/register" component={Register} exact />

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
