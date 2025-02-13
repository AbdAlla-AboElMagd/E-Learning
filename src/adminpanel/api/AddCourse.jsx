import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Snackbar,
  Box,
  Grid,
  Grid2,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import InputMUIText from "../../Components/InputMUIText";
import InputMUINumber from "../../Components/InputMUINumber";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_image: "",
    price: "",
    course_description: "",
    instrc_name: "",
    instrc_title: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Use snackbar instead of Alert

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const [btnLoading, setBtntnLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/E-Learning/unauthorized");
    } else {
      if (user.role != "admin") {
        history.push("/E-Learning/unauthorized");
      }
    }
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtntnLoading(true);
    try {
      const response = await axios.post(
        "https://retoolapi.dev/3apaeZ/data/",
        courseData
      ); // Replace with your API endpoint
      console.log("Course created:", response.data);

      setSuccessMessage("Course added successfully!");
      setErrorMessage("");
      setOpenSnackbar(true);

      // Clear the form
      setCourseData({
        course_name: "",
        course_image: "",
        price: "",
        course_description: "",
        instrc_name: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while adding the course."
      );
      setSuccessMessage("");
      setOpenSnackbar(true);
    } finally {
      setBtntnLoading(false);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChangeForm = (name, value, isError) => {
    console.log("TEst", name, value);
    switch (name) {
      case "course_name":
        setCourseData({ ...courseData, [name]: value });
        break;
      case "course_description":
        setCourseData({ ...courseData, [name]: value });
        break;
      case "instrc_name":
        setCourseData({ ...courseData, [name]: value });
        break;
      case "price":
        setCourseData({ ...courseData, [name]: value });
        break;
      case "instrc_title":
        setCourseData({ ...courseData, [name]: value });
        break;
      case "instrc_img":
        setCourseData({ ...courseData, [name]: value });
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Course
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <InputMUIText
                  title="Title"
                  name="course_name"
                  reg={/^.+$/}
                  Msg="Enter Course Title name"
                  errMsg="Title Name is Required"
                  changeCB={handleChangeForm}
                />
              </Box>
            </Grid2>
            <InputMUIText
              title="course_description"
              name="course_description"
              reg={/^.+$/}
              Msg="Enter Course Description"
              errMsg="Title is Required"
              changeCB={handleChangeForm}
            />
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <InputMUIText
                  title="instructor Name"
                  name="instrc_name"
                  reg={/^.+$/}
                  Msg="Enter Course Instructor Name"
                  errMsg="Instructor Name is Required"
                  changeCB={handleChangeForm}
                />
              </Box>
            </Grid2>
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <InputMUIText
                  title="instructor Tittle"
                  name="instrc_title"
                  reg={/^.*$/}
                  Msg="Enter Course Instructor Tittle"
                  errMsg="Instructor Tittle Error"
                  changeCB={handleChangeForm}
                />
              </Box>
            </Grid2>
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <InputMUIText
                  title="Instructor Image"
                  name="instrc_img"
                  reg={/^.*$/}
                  Msg="Enter Instructor Image"
                  errMsg="Error in Instructor Image"
                  changeCB={handleChangeForm}
                />
              </Box>
            </Grid2>
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <InputMUINumber
                  title="Course Price"
                  name="price"
                  reg={/^\d+(\.\d+)?$/}
                  Msg="Enter Course Price"
                  errMsg="Error in Course Price"
                  changeCB={handleChangeForm}
                />
              </Box>
            </Grid2>
          </Grid2>
          {/* <TextField
            label="Title"
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          /> */}
          {/* <TextField
            label="Description"
            name="course_description"
            value={courseData.course_description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          /> */}
          {/* <TextField
            label="Instructor"
            name="instrc_name"
            value={courseData.instrc_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          /> */}
          {/* <TextField
            name="course_image"
            value={courseData.course_image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="text"
          /> */}

          {/* <TextField
            label="Price"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          /> */}
          <Grid2
            item="true"
            size={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !courseData.course_name ||
                  courseData.course_name == "" ||
                  !courseData.course_description ||
                  courseData.course_description == "" ||
                  !courseData.instrc_name ||
                  courseData.instrc_name == "" ||
                  !courseData.price ||
                  courseData.price == ""
                }
                loading={btnLoading ? true : false}
                fullWidth
              >
                Add Course
              </Button>
            </Box>
          </Grid2>
        </form>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {successMessage ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        ) : (
          errorMessage && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          )
        )}
      </Snackbar>
    </Container>
  );
};

export default AddCourse;
