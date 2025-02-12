// import React, { useState, useEffect } from "react";
// import { TextField, Button, Box, Typography, Paper } from "@mui/material";

// const Form = ({ onSubmit, existingCourse }) => {



//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState("");
//   const [courseData, setCourseData] = useState({
//     course_name: "",
//     course_image: "",
//     price: "",
//     course_description: "",
//     instructor: "",
//   });

// //   useEffect(()=>{
// //     axios.post("https://api-generator.retool.com/L5z0NU/courses")
// //     .then((response) => setCourses(response.data))
// //     .catch((error) => setErrors(error.message));
// // }, [setCourseData]);


//   // Fill form when editing a course
//   useEffect(() => {
//     if (existingCourse) {
//       setCourseData(existingCourse);
//     }
//   }, [existingCourse]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setCourseData({ ...courseData, [e.target.name]: e.target.value });
//   };

//   //Handel upload image
//   const validateImage = (url) => {
//     const imageRegex = /\.(jpeg|jpg|png|gif)$/i;
//     if (!url.match(imageRegex)) {
//       setErrors((prev) => ({ ...prev, course_image: "Invalid image format! Use JPG, PNG, or GIF." }));
//       setImagePreview("");
//     } else {
//       setErrors((prev) => ({ ...prev, course_image: "" }));
//       setImagePreview(url);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) {
//       onSubmit(courseData);
//     }
//     setCourseData({
//       course_name: "",
//       course_image: "",
//       price: "",
//       course_description: "",
//       instructor: "",
//     });
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         {existingCourse ? "Update Course" : "Add Course"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Course Name"
//           name="course_name"
//           variant="outlined"
//           margin="normal"
//           value={courseData.course_name}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           name="course_image"
//           type="file"
//           variant="outlined"
//           margin="normal"
//           value={courseData.course_image}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Price"
//           name="price"
//           type="number"
//           variant="outlined"
//           margin="normal"
//           value={courseData.price}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="course_description"
//           variant="outlined"
//           margin="normal"
//           multiline
//           rows={4}
//           value={courseData.course_description}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Instructor"
//           name="instructor"
//           variant="outlined"
//           margin="normal"
//           value={courseData.instructor}
//           onChange={handleChange}
//           required
//         />
//         <Box mt={2}>
//           <Button type="submit" variant="contained" color="success" fullWidth>
//             {existingCourse ? "Update Course" : "Add Course"}
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default Form;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Grid, Container, Typography, Alert } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
    marginTop: '2rem',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
});

const CourseForm = ({ courseId, onSubmit, initialData }) => { // onSubmit prop

    const [formData, setFormData] = useState({
        course_name: "",
        course_image: "",
        price: "",
        course_description: "",
        instructor: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load initial data passed as a prop (from parent)
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const value = e.target.value;  // Get the image URL directly
        setFormData(prevState => ({
            ...prevState,
            course_image: value,
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.course_name) {
            newErrors.course_name = "Course name is required.";
        }
        if (!formData.course_image) {
            newErrors.course_image = "Course image URL is required.";
        } else {
            // Basic URL validation (you can improve this)
            try {
                new URL(formData.course_image);
            } catch (_) {
                newErrors.course_image = "Invalid image URL.";
            }
        }

        if (!formData.price) {
            newErrors.price = "Price is required.";
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be a positive number.";
        }
        if (!formData.course_description) {
            newErrors.course_description = "Course description is required.";
        }
        if (!formData.instructor) {
            newErrors.instructor = "Instructor is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True if no errors
    };

    // Remove handleSubmit from here

    return (
        <StyledContainer maxWidth="md">
            <Typography variant="h5" gutterBottom>{courseId ? 'Edit Course' : 'Create Course'}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Course Name"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleChange}
                        error={!!errors.course_name}
                        helperText={errors.course_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Course Image URL"
                        name="course_image"
                        value={formData.course_image}
                        onChange={handleImageChange}
                        error={!!errors.course_image}
                        helperText={errors.course_image}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Instructor"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        error={!!errors.instructor}
                        helperText={errors.instructor}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Course Description"
                        name="course_description"
                        value={formData.course_description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        error={!!errors.course_description}
                        helperText={errors.course_description}
                    />
                </Grid>
            </Grid>

        </StyledContainer>
    );
};

export default CourseForm;
