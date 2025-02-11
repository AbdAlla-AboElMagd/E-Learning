import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoursesList from './CoursesList';
import CourseDetails from './CourseDetails';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/E-Learning" component= {CoursesList} exact/>
        <Route path="/" component= {CoursesList} exact/>
        <Route path="/course-details/:id" component= {CourseDetails} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
