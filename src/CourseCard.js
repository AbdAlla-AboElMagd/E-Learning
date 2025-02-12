import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AddFav, DelFav } from "./Redux/Actions/ChangeFav";

function CourseCard({ course }) {
    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(false);
    let favCourses = useSelector((state) => state.favCourses.favCourses);
    let total_fav = useSelector((state) => state.favCourses.totalFav);
    const dispatch = useDispatch();

    const handleCardClick = () => {
        history.push(`/course-details/${course.id}`);
    };

    
    function CourseObj(id, course_name, course_description, instrc_name, price, instrc_img) {
        return {
            id: id,
            course_name: course_name,
            instrc_img: instrc_img,
            course_description: course_description,
            instrc_name: instrc_name,
            price: price
        };
    }
    const handleFav = (id, course_name, course_description, instrc_name, price, instrc_img) => {
        let myPayload = {};
        myPayload.id = id;
        myPayload.data = CourseObj (id, course_name, course_description, instrc_name, price, instrc_img);

        favCourses[id] == undefined
            ? dispatch(AddFav(myPayload))
            : dispatch(DelFav(myPayload));
        };
        const toggleFavorite = (event) => {
            event.stopPropagation();
            setIsFavorite(!isFavorite);
            handleFav(course.id, course.course_name, course.course_description, course.instrc_name, course.price, course.instrc_img)
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
                        {favCourses[course.id] ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CourseCard;
