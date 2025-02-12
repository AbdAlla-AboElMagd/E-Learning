// import { useDispatch, useSelector } from "react-redux";
// import { AddFav, DelFav } from "../Redux/Actions/ChangeFav";

// let favCourses = useSelector((state) => state.favCourses.favCourses);
// let total_fav = useSelector((state) => state.favCourses.totalFav);
// const dispatch = useDispatch();
// function CourseObj(id, title, course_img, course_desc) {
//   return {
//     id: id,
//     title: title,
//     course_img: course_img,
//     course_desc: course_desc,
//   };
// }
// const handleFav = (id, title, course_img, course_desc) => {
//   let myPayload = {};
//   myPayload.id = id;
//   myPayload.data = CourseObj(id, title, course_img, course_desc);

//   favCourses[id] == undefined
//     ? dispatch(AddFav(myPayload))
//     : dispatch(DelFav(myPayload));
// };

// -------------------------------------------------------------------------------
// Logout
// import { Reset } from "../Redux/Actions/ChangeFav";
// import { login, logout } from "../Redux/Actions/Logout";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
// dispatch(Reset());
// dispatch(logout());
// -------------------------------------------------------------------------------
