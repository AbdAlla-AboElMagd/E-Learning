// import { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";

// const EditCourse = () => {
//   const { courseId } = useParams();
//   const history = useHistory();
//   const [courseData, setCourseData] = useState({
//     course_name: "",
//     course_description: "",
//     instructor: "",
//     course_image: "",
//     price: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     axios.get(` https://api-generator.retool.com/L5z0NU/courses/${courseId}`)
//       .then((response) => setCourseData(response.data))
//       .catch((error) => console.error("Error fetching course data:", error));
//   }, [courseId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put(`https://api-generator.retool.com/L5z0NU/courses/${courseId}`, courseData, {
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         setSuccessMessage("Course updated successfully!");
//         setOpenSnackbar(true);
//         setTimeout(() => history.push("/E-Learning/dashboard/courses/listcourses"), 1000);
//       })
//       .catch((error) => {
//         setErrorMessage("Error updating course");
//         setOpenSnackbar(true);
//       });
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4} mb={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Edit Course
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             name="course_name"
//             value={courseData.course_name}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Description"
//             name="course_description"
//             value={courseData.course_description}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             required
//           />
//           <TextField
//             label="Instructor"
//             name="instructor"
//             value={courseData.instructor}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             name="course_image"
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             type="file"
//           />
//           <TextField
//             label="Price"
//             name="price"
//             value={courseData.price}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//             InputProps={{ inputProps: { min: 0 } }}
//           />
//           <Button variant="contained" color="primary" type="submit">
//             Save Changes
//           </Button>
//         </form>
//       </Box>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         {successMessage ? (
//           <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//             {successMessage}
//           </Alert>
//         ) : (
//           errorMessage && (
//             <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
//               {errorMessage}
//             </Alert>
//           )
//         )}
//       </Snackbar>
//     </Container>
//   );
// };

// export default EditCourse;

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid2,
} from "@mui/material";
import { useSelector } from "react-redux";
import InputMUIText from "../../Components/InputMUIText";
import InputMUINumber from "../../Components/InputMUINumber";

const EditCourse = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_description: "",
    instrc_name: "",
    instrc_img: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/E-Learning/unauthorized");
    } else {
      if (user.role != "admin") {
        history.push("/E-Learning/unauthorized");
      }
    }
    axios
      .get(`https://retoolapi.dev/3apaeZ/data/${courseId}`)
      .then((response) => setCourseData(response.data))
      .catch((error) => console.error("Error fetching course data:", error));
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    axios
      .put(`https://retoolapi.dev/3apaeZ/data/${courseId}`, courseData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setSuccessMessage("Course updated successfully!");
        setOpenSnackbar(true);
        setTimeout(() => history.push("/E-Learning/admin/listcourses"), 1000);
      })
      .catch(() => {
        setErrorMessage("Error updating course");
        setOpenSnackbar(true);
      })
      .finally(() => setBtnLoading(false));
  };

  const handleCloseSnackbar = () => {
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
          Edit Course
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
                  value={courseData.course_name}
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
              value={courseData.course_description}
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
                  value={courseData.instrc_name}
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
                  value={courseData.instrc_title}
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
                  title="Course Image"
                  name="instrc_img"
                  value={courseData.instrc_img}
                  reg={/^.*$/}
                  Msg="Enter Course Image"
                  errMsg="Error in Course Image"
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
                  value={courseData.price}
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
            label="Course Name"
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          /> */}
          {/*
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
            label="Instructor Name"
            name="instrc_name"
            value={courseData.instrc_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Instructor Image URL"
            name="instrc_img"
            value={courseData.instrc_img}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
          /> */}
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

export default EditCourse;
