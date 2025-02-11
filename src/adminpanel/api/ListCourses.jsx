import { useEffect, useState } from "react";
import axios from "axios";
import Card from './../components/Card';
import Tablee from "../components/Table";

function ListCourses() {
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios.get("https://retoolapi.dev/L5z0NU/courses")
            .then((response) => setCourses(response.data))
            .catch((error) => setErrors(error.message));
    }, []);

    return (
        <div>
            {errors && <p style={{ color: "red" }}>Error: {errors}</p>}
         
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
