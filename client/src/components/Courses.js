import React, { useContext, useEffect, useState } from 'react';
import { Link, Router, useNavigate } from 'react-router-dom';
import { Context } from '../Context'
// allow Courses component to retrieve it's data from the REST API when those components are mounted.
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const {data } = useContext(Context)
console.log(data);

  useEffect(() => {
   data.getCourses()
      .then((response) => setCourses(response))
      .catch((error) => {
        console.log(error.message);
        useNavigate('/error');
      }, []);
  });


  return (
    <React.Fragment>
      <div className="wrap main--grid">
        
        
                <Link className="course--module course--link" 
                href={`/course-detail`} 
                // key={index} 
                >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Course Title</h3>
                 </Link>
                    
             
        
      {/* {courseList} */}
      <a className="course--module course--add--module">
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
      </a> 
    </div>
    </React.Fragment>
  );
};

export default Courses;
