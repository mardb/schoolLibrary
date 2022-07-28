import React, { useEffect, useState } from 'react';
import { Link, Router, useNavigate } from 'react-router-dom';

// allow Courses component to retrieve it's data from the REST API when those components are mounted.
const Courses = (props) => {
  const [courses, setCourses] = useState(null);
//   const { context } = props;

  useEffect(() => {
   props.context.actions
      .getCourses()
      .then((response) => setCourses(response))
      .catch((error) => {
        console.log(error.message);
        useNavigate('/error');
      }, []);
  });

//   const courseList = courses.map((course, index) => {
//     return (
//       <React.Fragment>
//         <Link
//           className="course--module course--link"
//           to={`/courses/${course.id}`}
//           key={index}
//         >
//           <h2 className="course--label">Course</h2>
//           <h3 className="course--title">{course.title}</h3>
//         </Link>
//       </React.Fragment>
//     );
//   });

  return (
    <React.Fragment>
      <div className="wrap main--grid">
        
          if(courses){
            courses.map((course, index)=>{
              return(
                <Link className="course--module course--link" to={`/courses/${course.id}`} key={index} >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
                </Link>
                    )
                })
            }
        
      {/* {courseList} */}
      {/* <Link className="course--module course--add--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link> */}
    </div>
    </React.Fragment>
  );
};

export default Courses;
