
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

      case "ADD_COURSE_TO_STORE":
        state.Courses.push(action.data)
        return {
          ...state,
          // Courses: Course
        }

      case "REMOVE_COURSE_FROM_STORE":
        console.log(action.data)
        const updated_course = [...state.Courses];

        for(var i=0;i<state.Courses.length;i++){
          console.log(state.Courses[0]._id)
          if(state.Courses[i]._id==action.data){
            console.log(action.data)
            updated_course.splice(i,1);
          }
          state.Courses=updated_course;
          return state;
        }

    default:
      return state;
  }
};

export default reducer;
