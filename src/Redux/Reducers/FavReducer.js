const INIT_VALUES = {
  favCourses: {},
  totalFav: 0,
};

export default function favReducer(state = INIT_VALUES, action) {
  switch (action.type) {
    case "AddFav":
      return {
        ...state,
        favCourses: {
          ...state.favCourses,
          [action.payload.id]: action.payload.data,
        },
        totalFav: state.totalFav + 1,
      };
    case "DelFav":
      const courses = state.favCourses;
      delete courses[action.payload.id];
      return {
        ...state,
        favCourses: courses,
        totalFav: state.totalFav >= 0 ? state.totalFav - 1 : 0,
      };
    case "Reset":
      return INIT_VALUES;
    default:
      return state;
  }
}
