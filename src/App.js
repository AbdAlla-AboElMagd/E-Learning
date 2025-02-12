import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPanel from './adminpanel/AdminPanel'
import AddCourse from "./adminpanel/api/AddCourse";
import ListCourses from "./adminpanel/api/ListCourses";
import NotFound from './adminpanel/pages/NotFound';
import UpdateCourse from "./adminpanel/api/UpdateCourse";

function App() {
  return (
    <div className="">
      
      <BrowserRouter>
      <AdminPanel/>

        <Switch>

          <Route path="/" component={Login} exact />
          <Route path="/E-Learning" component={AdminPanel} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/E-Learning/login" component={Login} exact />

          <Route path="/E-Learning/register" component={Register} exact />
          <Route path="/register" component={Register} exact />


          <Route path="/E-Learning/dashboard" component={AdminPanel} exact/>
          <Route path="/E-Learning/dashboard/courses/addcourse"component={AddCourse}exact/>
          <Route path="/E-Learning/dashboard/courses/listcourses"component={ListCourses}exact/>
          <Route path="/E-Learning/dashboard/courses/updatecourses/:courseId"component={UpdateCourse}exact/>

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
