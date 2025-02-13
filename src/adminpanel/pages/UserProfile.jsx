import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  CardContent,
//   Typography,
  Avatar,
//   Box,
  Grid,
  CircularProgress,
  Container,
//   Button,
} from "@mui/material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCourse, setUserCourse] = useState(true);
  const [open, setOpen] =useState(false);
    const [selectedId, setSelectedId] =useState(null);
    const [snackbarOpen, setSnackbarOpen] =useState(false);

  const API_URL = "https://retoolapi.dev/3apaeZ/data";

  const fetchCourseDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Return the course data
    } catch (error) {
      console.error("Error fetching course details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `https://api-generator.retool.com/QpLwM6/data?username=${user.username}`
        );
        setUserCourse(userResponse.data);

        // Fetch details for all courses
        const coursePromises = userResponse.data.map((course) =>
          fetchCourseDetails(course.course_id)
        );
        const courseDetails = await Promise.all(coursePromises);

        // Filter out any null values (failed fetches) and update the state
        setCourses(courseDetails.filter((course) => course !== null));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <Typography variant="h6">No user data available.</Typography>;
  }
  const deleteData = async (id) => {
    try {
      let idCourseUser = null;
      for (let key in userCourse) {
        if (userCourse[key].course_id === id) {
          idCourseUser = userCourse[key].id;
        }
      }
      const response = await axios.delete(
        `https://api-generator.retool.com/QpLwM6/data/${idCourseUser}`
      );
      console.log("Data deleted successfully:", response.data);
      console.log("hi", courses);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUnjoin = async (courseId) => {
    try {
      courseId=selectedId
      await deleteData(courseId);
      
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error unjoining course:", error);

    }
    finally{
      setOpen(false);

    }
  };
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
    <Container sx={{ mt: 5 }}>
      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        {/* User Avatar */}
        <Avatar
          src="/static-avatar.jpg"
          alt="User Avatar"
          sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
        />

        <CardContent>
          {/* User Name */}
          <Box display="flex" alignItems="center" justifyContent="center">
            <PersonIcon sx={{ mr: 1 }} />
            <Typography variant="h5">
              {user.fullname || "Unknown User"}
            </Typography>
          </Box>

          {/* Email */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={1}
          >
            <EmailIcon sx={{ mr: 1 }} />
            <Typography color="textSecondary">
              {user.email || "No Email"}
            </Typography>
          </Box>

          {/* Divider */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Courses Joined
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.course_name}>
                    <Link
                      to={`/E-Learning/course-details/${course.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                        <SchoolIcon
                          color="primary"
                          sx={{ fontSize: 40, mb: 1 }}
                        />
                        <Typography variant="body1">
                          {course.course_name}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpen(course.id);
                          }}
                          sx={{ m: 1 }}
                        >
                          Unjoin
                        </Button>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography>No courses found</Typography>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>

<Dialog open={open} onClose={handleClose}>
<DialogTitle>Confirm Deletion</DialogTitle>
<DialogContent>
  <DialogContentText>
    Are you sure you want to unjoin this course? This action cannot be undone.
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose} color="primary">
    Cancel
  </Button>
  <Button onClick={handleUnjoin} color="error" autoFocus>
    Unjoin
  </Button>
</DialogActions>
</Dialog>
   <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Course Unjoined successfully!
        </Alert>
      </Snackbar>
</>
  );
};

export default UserProfile;
