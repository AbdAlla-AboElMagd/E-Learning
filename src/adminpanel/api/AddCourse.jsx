import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Snackbar,
  Box,
} from '@mui/material';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_image: "",
    price: "",
    course_description: "",
    instructor: "",
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Use snackbar instead of Alert

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api-generator.retool.com/L5z0NU/courses', courseData); // Replace with your API endpoint
      console.log('Course created:', response.data);

      setSuccessMessage('Course added successfully!');
      setErrorMessage('');
      setOpenSnackbar(true);

      // Clear the form
      setCourseData({
        course_name: "",
        course_image: "",
        price: "",
        course_description: "",
        instructor: "",
      });
    } catch (error) {
      console.error('Error creating course:', error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          'An error occurred while adding the course.'
      );
      setSuccessMessage('');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Course
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="course_description"
            value={courseData.course_description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Instructor"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
            <TextField
            name="course_image"
            value={courseData.course_image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="file" // Input type for URLs
            
          />

          <TextField
            label="Price"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number" 
            InputProps={{ inputProps: { min: 0 } }} 
          />
          

          <Button variant="contained" color="primary" type="submit">
            Add Course
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {successMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        ) : (
          errorMessage && (
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          )
        )}
      </Snackbar>
    </Container>
  );
};

export default AddCourse;