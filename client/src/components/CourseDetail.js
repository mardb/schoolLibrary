import React, { 
    // useContext, 
    useEffect, useState } from 'react';
// import Context from '../Context';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted.
// import Data from '../Data';

//change to stateful component

const CourseDetail = (props) => {
  const history = useHistory();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  // const {data, authenticatedUser} = useContext(Context)
  const { id } = useParams();

  useEffect((data) => {
    const url = 'http://localhost:5000/api';
    fetch(`${url}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.course);
        setCourse(data.course);
        setIsLoading(false);
      });
    //     data.courseDetail(id)
    // .then(response => setCourse(response))
    // .catch(error => {
    //     console.log(error);
    //     history.push('/notfound');
    // })
  }, []);

  if (!isLoading) {
    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            <Link
              to={`/courses/${id}/update`}
              className="button"
              href="update-course.html"
            >
              Update Course
            </Link>
            <button className="button" href="#">
              Delete Course
            </button>
            <Link to={'/'} className="button button-secondary">
              Return to List
            </Link>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>
                  By {course.user.firstName} {course.user.lastName}{' '}
                </p>
                {/*  React markdown her*/}
                {/* <p>{course.description}</p> */}
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                {/* jsx for time */}
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {/* React markdown here  */}
                  <ReactMarkdown className="course--detail--list">
                    {course.materialsNeeded}
                  </ReactMarkdown>
                  {/* <li>{course.materialsNeeded}</li> */}
                  {/* <li>1 x 2 common pine</li> */}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <h1> Loading...</h1>;
  }
};
export default CourseDetail;
