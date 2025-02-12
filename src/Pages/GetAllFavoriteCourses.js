import { useSelector } from "react-redux";
import CourseCard from "../CourseCard";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Favorite } from "@mui/icons-material";

function GetAllFavoriteCourses(props) {
  let favCourses = useSelector((state) => state.favCourses.favCourses);
  let total_fav = useSelector((state) => state.favCourses.totalFav);

  console.log(favCourses);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Favorite Courses
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        <Link
          to="/E-Learning/FavCourses"
          style={{ textDecoration: "none", color: "red" }}
        >
          <Favorite /> <span> {total_fav} </span>
        </Link>
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {Object.entries(favCourses).map(([id, course]) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Box>
    </Container>
  );
}

export default GetAllFavoriteCourses;
