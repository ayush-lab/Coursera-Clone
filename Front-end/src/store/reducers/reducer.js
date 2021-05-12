
const initialState = {
  Courses: [],
  PreferenceCourse:[],
};

const reducer = (state = initialState, action) => {
 

  switch (action.type) {
    case "FETCH_ALL_DATA":
      return {
        ...state,
        Courses: action.data,
      };

      case "FETCH_PREFERENCE_DATA":
      return {
        ...state,
        PreferenceCourse: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
