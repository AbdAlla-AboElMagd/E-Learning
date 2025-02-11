import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Container, Box, Typography, Pagination } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";


function CoursesList() {
    let total_fav = useSelector((state) => state.favCourses.totalFav);
    const API_URL = "https://retoolapi.dev/3apaeZ/data";
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const navigate = useHistory();

    useEffect(() => {
        fetchCourses();
    }, [page]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
            setCourses(response.data);
            setTotalPages(Math.ceil(response.headers["x-total-count"] / limit));
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    return (
        <Container>
            <Link to="/E-Learning/FavCourses">
<Favorite />   {" "}          
   <span> {total_fav} </span>
            </Link>
            <Typography variant="h4" align="center" gutterBottom>Courses</Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </Box>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
            />
        </Container>
    );
};


export default CoursesList;
