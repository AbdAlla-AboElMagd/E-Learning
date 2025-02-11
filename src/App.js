import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CoursesList from './CoursesList';
import CourseDetails from './CourseDetails';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import GetAllFavoriteCourses from "./Pages/GetAllFavoriteCourses";


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
        <Route path="/E-Learning" component= {CoursesList} exact/>
        <Route path="/" component= {CoursesList} exact/>
        <Route path="/course-details/:id" component= {CourseDetails} exact/>
        

          <Route path="/login" component={Login} exact />
          <Route path="/E-Learning/login" component={Login} exact />

          <Route path="/E-Learning/register" component={Register} exact />
          <Route path="/register" component={Register} exact />

          <Route path="/FavCourses" component={GetAllFavoriteCourses} exact />
          <Route path="/E-Learning/FavCourses" component={GetAllFavoriteCourses} exact />


          
          <Route path="*" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
