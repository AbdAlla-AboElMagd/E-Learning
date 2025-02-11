import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";

function AddCourse (){

     const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState(null);
    

    useEffect(()=>{
        axios.post("https://api-generator.retool.com/L5z0NU/courses")
        .then((response) => setCourses(response.data))
        .catch((error) => setErrors(error.message));
}, []);




    return(
     
        <Form/>
    )
}

export default AddCourse