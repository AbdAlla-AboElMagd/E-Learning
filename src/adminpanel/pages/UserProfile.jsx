import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { 
  Card, CardContent, Typography, Avatar, Box, 
  Grid, CircularProgress, Container, 
  Button
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

const UserProfile = () => {


  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCourse, setUserCourse] = useState(true);

  const API_URL = "https://retoolapi.dev/3apaeZ/data";

  const fetchCourseDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('dsfd',response.data.course_name)
        setCourses([...courses, response.data ]  );
        
    } catch (error) {
        console.error("Error fetching course details:", error);
    }
};

  useEffect(() => {
    axios.get(`https://api-generator.retool.com/QpLwM6/data?username=${user.username}`)
      .then((response) => {
        setUserCourse(response.data);
        const coursePromises = response.data.map((course) => fetchCourseDetails(course.id));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);



  if (!user) {
    return <Typography variant="h6">No user data available.</Typography>;
  }
  const deleteData = async (id) => {
    try {
        const response = await axios.delete(`https://api-generator.retool.com/QpLwM6/data/${id}`);
        console.log('Data deleted successfully:', response.data);
        console.log('hi',courses)

    } catch (error) {
        console.error('Error deleting data:', error);
    }
};

const handleUnjoin = async (courseId) => {


    try {
        await deleteData(courseId); 
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));


  
    } catch (error) {
      console.error("Error unjoining course:", error);
    }
  };
  
  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 500, mx: "auto", p: 3, textAlign: "center", borderRadius: 3 }}>
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
            <Typography variant="h5">{user.name || "Unknown User"}</Typography>
          </Box>

          {/* Email */}
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography color="textSecondary">{user.email || "No Email"}</Typography>
          </Box>

          {/* Divider */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Courses Joined</Typography>

          {/* Loading Indicator */}
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {courses.length > 0 ? (
                courses.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id}> {/* Use a stable key */}
        <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}> 
                      <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body1"> {course.course_name}</Typography>
                      <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleUnjoin(course.id)}
                          sx={{ m: 1 }}
                        >
                          unjoin
                        </Button>
                    </Card>
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
  );
};

export default UserProfile;
