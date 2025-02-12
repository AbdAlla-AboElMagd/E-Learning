import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Button, Alert, Paper, Grid, Avatar, } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CourseDetails() {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const API_URL = "https://retoolapi.dev/3apaeZ/data";
    const POST_URL = "https://api-generator.retool.com/QpLwM6/data";
    const ENROLL_URL = "https://api-generator.retool.com/QpLwM6/data?username=";
    const { id } = useParams();
    const history = useHistory()
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCourseDetails(id);
    }, [id]);

    const fetchCourseDetails = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setCourse(response.data);
            checkEnrolled(user.username, id)

        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };

    const PostEnrolled = async (username, id) => {
            const data = {
                username: username,
                course_id: id
            };
            try {
                const response = await axios.post('https://api-generator.retool.com/QpLwM6/data', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        
    };

    const checkEnrolled = async (username, id) => {
        if (isLoggedIn) {
            try {
                const response = await axios.get(`${ENROLL_URL}${username}`);
                const EnrolledCourses = response.data.some(course => course.course_id == id);
                setIsEnrolled(EnrolledCourses)
            }

            catch (error) {
                console.error("Error fetching course details:", error);
            }
        };
    }




    const handleEnroll = () => {
        if (!isLoggedIn) {
            setMessage("Please login to enroll in this course.");
            history.push("/E-Learning/login")
        
            return;
        }
        if (!isEnrolled) {
            setIsEnrolled(true);
            PostEnrolled(user.username, course.id)
            setMessage("You're successfully enrolled in this course!");
        

        }
        

    };

    if (!course) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Box mt={4}>
                {/* Section 1: Course Info */}
                <Paper elevation={12} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4">{course.course_name}</Typography>
                    <Typography variant="body1" mt={2}>
                        {course.course_description}
                    </Typography>
                </Paper>

                <Grid container spacing={3}>
                    {/* Section 2: Enrollment */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={12} sx={{ p: 3 }}>
                            <Typography variant="h6">Enroll in Course</Typography>
                            <Box mt={2}>
                                {!isLoggedIn ? (
                                    <Button variant="contained" color="primary" onClick={handleEnroll}>
                                        Login to Enroll
                                    </Button>
                                ) : isEnrolled ? (
                                    <Button variant="contained" color="success" disabled>
                                        You're Enrolled
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={handleEnroll}>
                                        Enroll
                                    </Button>
                                )}
                            </Box>

                            {message && (
                                <Box mt={2}>
                                    <Alert severity={isEnrolled ? "success" : "info"}>{message}</Alert>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Section 3: Instructor Info */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={12} sx={{ p: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar
                                        src={course.instrc_img}
                                        alt={course.instrc_name}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h6">{course.instrc_name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {course.instrc_title}
                                    </Typography>
                                    {/* Instructor Rating */}
                                    <Box mt={3} display="flex" alignItems="center">
                                        <Typography variant="h6" mr={2}>
                                            Rating:
                                        </Typography>
                                        <Rating
                                            name="course-rating"
                                            value={course.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                        <Typography variant="body1" ml={1}>
                                            ({course.rating})
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" mt={2}>
                                {course.instrc_desc}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Section 4: Course Content */}
                <Paper elevation={12} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h5">Course Content</Typography>

                    {Array.from({ length: Math.floor(Math.random() * (10 - 3 + 1)) + 3 }, (_, index) => (
                        // يختار عدد عشوائي بين 3 و 10
                        <Paper key={index} elevation={6} sx={{ p: 2, mt: 2 }}>
                            <Typography variant="h6">
                                {`Course: ${course.course_name}`}  {/* اسم الكورس ثابت */}
                            </Typography>
                            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                                <Typography variant="subtitle1">
                                    {`Chapter 0${index + 1}: ${course.course_description}`}
                                </Typography>
                            </Paper>
                        </Paper>
                    ))}
                </Paper>

            </Box>
        </Container>
    );
}

export default CourseDetails;

