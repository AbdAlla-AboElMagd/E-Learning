import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";

const EditCourse = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_description: "",
    instructor: "",
    course_image: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios.get(` https://api-generator.retool.com/L5z0NU/courses/${courseId}`)
      .then((response) => setCourseData(response.data))
      .catch((error) => console.error("Error fetching course data:", error));
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://api-generator.retool.com/L5z0NU/courses/${courseId}`, courseData, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setSuccessMessage("Course updated successfully!");
        setOpenSnackbar(true);
        setTimeout(() => history.push("/E-Learning/dashboard/courses/listcourses"), 1000);
      })
      .catch((error) => {
        setErrorMessage("Error updating course");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Course
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
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="file"
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
            Save Changes
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

export default EditCourse;
