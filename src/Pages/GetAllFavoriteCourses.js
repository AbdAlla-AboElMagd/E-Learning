import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../CourseCard";
import { Box, Container, Typography } from "@mui/material";

function GetAllFavoriteCourses(props) {
  let favCourses = useSelector((state) => state.favCourses.favCourses);
  let totalFav = useSelector((state) => state.favCourses.totalFav);
  console.log("hghjhj")
  console.log(favCourses)
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Favorite Coursses</Typography>
      <Typography variant="h5" align="center" gutterBottom>Total Results: {totalFav}</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
      {Object.entries(favCourses).map(([id, course]) => {
        <>
        <div> hjf{id} </div>
            <CourseCard key={course.id} course={course} />
          </>
          })}
          </Box>
    </Container>
  );
}

export default GetAllFavoriteCourses;
