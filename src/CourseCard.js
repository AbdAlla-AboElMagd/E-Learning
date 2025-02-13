import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Container, Box, Typography, Pagination, Slider } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";

function CoursesList() {
  let total_fav = useSelector((state) => state.favCourses.totalFav);
  const API_URL = "https://retoolapi.dev/3apaeZ/data";
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const navigate = useHistory();

  useEffect(() => {
    fetchCourses();
  }, [page]);

  useEffect(() => {
    filterCourses();
  }, [courses, priceRange]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?_page=${page}&_limit=${limit}`
      );
      setCourses(response.data);
      setTotalPages(Math.ceil(response.headers["x-total-count"] / limit));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filterCourses = () => {
    const filtered = courses.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    setFilteredCourses(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Courses
      </Typography>
      {/* <Typography variant="h5" align="center" gutterBottom>
        <Link to="/E-Learning/FavCourses" style={{ textDecoration: "none", color: "red" }}>
          <Favorite /> <span> {total_fav} </span>
        </Link>
      </Typography> */}

      <Box width={300} margin="auto" mb={3}>
        <Typography align="center" gutterBottom>
          Filter by Price
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No courses found in this price range.
          </Typography>
        )}
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
}

export default CoursesList;
