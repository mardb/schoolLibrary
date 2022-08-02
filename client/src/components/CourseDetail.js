import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Buffer } from 'buffer';
import ReactMarkdown from 'react-markdown';
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted.
// import Data from '../Data';

//change to stateful component

const CourseDetail = (props) => {
  const history = useHistory();
  const { data, context, authenticatedUser, courses, actions} = useContext(Context);
console.log(authenticatedUser);
  // console.log(useContext(Context));
  // const { data.emailAddress, password } = credentials;
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [edit, setEdit] = useState(false);
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

  //
  const handleDelete = (credentials) => {
    const url = 'http://localhost:5000/api';
    fetch(`${url}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "Authorization":
          "Basic " +
          Buffer.from(
            `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
          
          ).toString('base64'),
      },
      body: null,
    }).then((response) => {
      if (response.status === 204) {
        console.log('Course was deleted.');
      } else if (response.status === 400) {
        response.json().then((data) => {
          return data.errors;
        });
      } else {
        throw new Error();
      }
    });
  };

  // console.log(course.title);

  return !isLoading ? (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
          <Link
            to={`/courses/${id}/update`}
            className="button"
            href="update-course.html"
          >
            Update Course
          </Link>
          <Link className="button" to="/courses" onClick={handleDelete}>
            Delete Course
          </Link>
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
    </React.Fragment>
  ) : (
    <h1> Loading...</h1>
  );
};
export default CourseDetail;
