import AuthServices from '../../ApiServices/auth.service';

export const fetchData = (data) => {
    return{
      type: 'FETCH_ALL_DATA',
      data: data
    }
  }

  export const PreferenceCourse = (data) => {
    return{
      type: 'FETCH_PREFERENCE_DATA',
      data: data
    }
  }

  export const AddCourseToStore = (data) => {
    return{
      type: 'ADD_COURSE_TO_STORE',
      data: data
    }
  }


   export const RemoveCourseFromStore = (data) => {
    return{
      type: 'REMOVE_COURSE_FROM_STORE',
      data: data
    }
  }


  export const EditCourseFromStore = (data) => {
      return{
        type: 'EDIT_COURSE_FROM_STORE',
        data: data
      }
    }

  // Async calls using redux thunks 

  export const fetchAsyncCourses = () => {
  return (dispatch) => {
    console.log('Sending Request!');
    AuthServices.AllCourses()
      .then((res)=>{
        console.log(res);
        dispatch(fetchData(res.data.course))
      })
      .catch((err)=>{
        console.log(err);
      })
  }
}


export const fetchAsyncPreferenceCourse = (CourseLink,data) => {
    return (dispatch) => {
      console.log('Sending Request!');
      AuthServices.PreferenceCourse(CourseLink,data)
        .then((res)=>{
          console.log(res);
          dispatch(PreferenceCourse(res.data.course))
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }