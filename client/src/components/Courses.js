import React, { useContext, useEffect, useState } from 'react';
import { Link, 
    // Router, useNavigate 
} from 'react-router-dom';
import { Context } from '../Context'
// import Data from '../Data';
// allow Courses component to retrieve it's data from the REST API when those components are mounted.
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const {data} = useContext(Context)
console.log(data);

  useEffect(() => {
   data.getCourses()
      .then((response) => setCourses(response)).then(response =>console.log(data.getCourses()))

      .catch((error) => {
        console.log(error.message);
        // useNavigate('/error');
        // history.pushState('/')
      });
  },[]);

//   const url = 'http://localhost:5000/api'
//   fetch(`${url}/courses`)
//   .then(res => res.json()).then(data => {
//     console.log(data.courses)
//   }
// );



  return (
    <React.Fragment>
      <div className="wrap main--grid">
        {courses.map((course, index) => 
            <Link to={`/courses/${course.id}`} 
            key={index} //for map
             className="course--module course--link" 
            
            >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
             </Link>
        )}

                {/* <Link className="course--module course--link" 
                to={`/course-detail`} 
                // key={index} //for map
                >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Course Title</h3>
                 </Link> */}
                    
             
      <Link to={`/courses/create`} className="course--module course--add--module">
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
      </Link> 
    </div>
    </React.Fragment>
  );
};

export default Courses;
