import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Form = ({ onSubmit, existingCourse }) => {



  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_image: "",
    price: "",
    course_description: "",
    instructor: "",
  });

  // Fill form when editing a course
  useEffect(() => {
    if (existingCourse) {
      setCourseData(existingCourse);
    }
  }, [existingCourse]);

  // Handle input changes
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  //Handel upload image
  const validateImage = (url) => {
    const imageRegex = /\.(jpeg|jpg|png|gif)$/i;
    if (!url.match(imageRegex)) {
      setErrors((prev) => ({ ...prev, course_image: "Invalid image format! Use JPG, PNG, or GIF." }));
      setImagePreview("");
    } else {
      setErrors((prev) => ({ ...prev, course_image: "" }));
      setImagePreview(url);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(courseData);
    }
    setCourseData({
      course_name: "",
      course_image: "",
      price: "",
      course_description: "",
      instructor: "",
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {existingCourse ? "Update Course" : "Add Course"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Name"
          name="course_name"
          variant="outlined"
          margin="normal"
          value={courseData.course_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          name="course_image"
          type="file"
          variant="outlined"
          margin="normal"
          value={courseData.course_image}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          variant="outlined"
          margin="normal"
          value={courseData.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="course_description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={courseData.course_description}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Instructor"
          name="instructor"
          variant="outlined"
          margin="normal"
          value={courseData.instructor}
          onChange={handleChange}
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="success" fullWidth>
            {existingCourse ? "Update Course" : "Add Course"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
