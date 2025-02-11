import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function CourseCard({ course }) {
    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleCardClick = () => {
        history.push(`/course-details/${course.id}`);
    };

    const toggleFavorite = (event) => {
        event.stopPropagation(); 
        setIsFavorite(!isFavorite);
    };

    return (
        <Card
            onClick={handleCardClick}
            style={{ cursor: "pointer", width: 300, position: "relative" }}
            elevation={3}
        >
            <CardMedia
                component="img"
                height="140"
                image={course.instrc_img}
                alt={course.name}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {course.course_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {course.course_description.slice(0, 50)}...
                </Typography>
                <Box mt={1}>
                    <Typography variant="body2" color="primary">
                        Instructor: {course.instrc_name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#1976D2",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        ${course.price}
                    </Box>

                    <IconButton onClick={toggleFavorite} color="error">
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CourseCard;
