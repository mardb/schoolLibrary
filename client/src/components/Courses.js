import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context'

// allow Courses component to retrieve it's data from the REST API when those components are mounted.
const Courses = () => {
  const { actions, courses } = useContext(Context);


  useEffect(() => {
   actions.getCourses()
  },[]);

if (!courses ) {
  return <div>Loading...</div>;
}

  return (
    <React.Fragment>
      <div className="wrap main--grid">
        {courses.map((course, index) => 
            <Link to={`/courses/${course.id}`} 
            key={index} 
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
                    
             {/* {authenticatedUser ? ( */}
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
             {/* ) : ( */}
               {/* <></> */}
             {/* )} */}
    </div>
    </React.Fragment>
  );
};

export default Courses;
