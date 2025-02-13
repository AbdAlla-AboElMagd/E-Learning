import { useEffect, useState } from "react";
import axios from "axios";
import Tablee from "../components/Table";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ListCourses() {
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/E-Learning/unauthorized");
    } else {
      if (user.role != "admin") {
        history.push("/E-Learning/unauthorized");
      }
    }
    axios
      .get("https://retoolapi.dev/L5z0NU/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => setErrors(error.message));
  }, []);

  return (
    <div>
      {errors && <p style={{ color: "red" }}>Error: {errors}</p>}
      <Search />

      <Tablee courses={courses} />
      {/* id
    price
    Insttrctor
    course_name
    course_image
    course_description */}
    </div>
  );
}

export default ListCourses;
