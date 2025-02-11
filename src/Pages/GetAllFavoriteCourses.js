import { useDispatch, useSelector } from "react-redux";

function GetAllFavoriteCourses(props) {
  let favCourses = useSelector((state) => state.favCourses.favCourses);
  let totalFav = useSelector((state) => state.favCourses.totalFav);
  return (
    <div className="m-2">
      <p className="fs-1 fw-bold">Favorite Coursses</p>
      <p>Total Results: {totalFav}</p>
      <div className="d-flex flex-row flex-wrap gap-4 justify-content-evenly align-items-center">
        {Object.entries(favCourses).map(([id, course]) => {
          return (
            <>
              {course.id}
              {course.name}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default GetAllFavoriteCourses;
