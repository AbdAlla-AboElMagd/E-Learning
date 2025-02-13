// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, TextField, Card, CardContent, CardMedia, Typography, Grid, Alert, CircularProgress } from "@mui/material";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch courses from API based on query
//   useEffect(() => {
//     if (query.length === 0) return; // Prevent unnecessary API calls

//     setLoading(true);
//     setError("");

//     axios
//       .get(`https://api-generator.retool.com/L5z0NU/courses?course_name=${query}`)
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error);
//         setError("Failed to fetch courses. Try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//   }, [query]);

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>

//       <TextField
//         fullWidth
//         label="Search course by name..."
//         variant="outlined"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         sx={{ mb: 3 }}
//       />

//       {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//       {loading && <CircularProgress sx={{ display: "block", mx: "auto", mb: 3 }} />}

//       {courses.length === 0 && !loading && !error && query && (
//         <Alert severity="warning" sx={{ mb: 3 }}>
//           No courses found! Try a different search term.
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.id}>
//             <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
//               {course.course_image && (
//                 <CardMedia
//                   component="img"
//                   height="180"
//                   image={course.course_image}
//                   alt={course.course_name}
//                 />
//               )}
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {course.course_name || "No Name Available"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Instructor:</strong> {course.Insttrctor || "Unknown"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Price:</strong> ${course.price || "N/A"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {course.course_description || "No description available."}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Search;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Card, CardContent, CardMedia, Typography, Grid, Alert, CircularProgress } from "@mui/material";

const Search = () => {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses from API based on query
  useEffect(() => {
    if (query.length === 0) return; // Prevent unnecessary API calls

    setLoading(true);
    setError("");

    axios
      .get(`https://retoolapi.dev/3apaeZ/data?course_name=${query}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Try again later.");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [query]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Search course by name..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", mb: 3 }} />}

      {courses.length === 0 && !loading && !error && query && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No courses found! Try a different search term.
        </Alert>
      )}

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              {course.instrc_img && (
                <CardMedia
                  component="img"
                  height="180"
                  image={course.instrc_img}
                  alt={course.course_name}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {course.course_name || "No Name Available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Instructor:</strong> {course.instrc_name || "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Title:</strong> {course.instrc_title || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price:</strong> ${course.price || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.course_description || "No description available."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
