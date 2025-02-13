import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPanel from "./adminpanel/AdminPanel";
import AddCourse from "./adminpanel/api/AddCourse";
import ListCourses from "./adminpanel/api/ListCourses";
import NotFound from "./adminpanel/pages/NotFound";
import UpdateCourse from "./adminpanel/api/UpdateCourse";
import CoursesList from "./CoursesList";
import CourseDetails from "./CourseDetails";
import GetAllFavoriteCourses from "./Pages/GetAllFavoriteCourses";
import Navbar from "./adminpanel/components/Navbar";
import UserProfile from "./adminpanel/pages/UserProfile";
import Footer from './Components/Footer'

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/E-Learning" component={CoursesList} exact />
          <Route path="/" component={CoursesList} exact />
          <Route path="/course-details/:id" component={CourseDetails} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/E-Learning/login" component={Login} exact />

          <Route path="/E-Learning/register" component={Register} exact />
          <Route path="/register" component={Register} exact />

          <Route path="/E-Learning/userProfile" component={UserProfile} exact />

          <Route path="/E-Learning/admin" component={AdminPanel} exact />
          <Route
            path="/E-Learning/admin/addcourse"
            component={AddCourse}
            exact
          />
          <Route
            path="/E-Learning/admin/listcourses"
            component={ListCourses}
            exact
          />
          <Route
            path="/E-Learning/admin/updatecourses/:courseId"
            component={UpdateCourse}
            exact
          />

          <Route path="/FavCourses" component={GetAllFavoriteCourses} exact />
          <Route
            path="/E-Learning/FavCourses"
            component={GetAllFavoriteCourses}
            exact
          />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
