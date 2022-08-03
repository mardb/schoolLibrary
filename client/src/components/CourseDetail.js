import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { Link, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import ReactMarkdown from 'react-markdown';

const CourseDetail = (props) => {
  //extracts properties from context
  const { authenticatedUser } = useContext(Context);
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
//fetches data from API
  useEffect((data) => {
    const url = 'http://localhost:5000/api';
    fetch(`${url}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setIsLoading(false);
      });
  }, []);

  //calls deleteCourse function from API
  const handleDelete = (credentials) => {
    const url = 'http://localhost:5000/api';
    fetch(`${url}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
          ).toString('base64'),
      },
      body: null,
    }).then((response) => {
      //course was deleted successfully, message in console else, errors. 
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
//while loading, gives loading message on screen, else loads UI. This is so that data loads before renter to prevent errors. 
  return !isLoading ? (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
          {/* //if user is authenticated buttons are visible else, disappear. */}
          {authenticatedUser && course.user ? (
            authenticatedUser.id === course.user.id ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <Link to={'/'} className="button button-secondary">
                Return to List
              </Link>
            )
          ) : (
            <Link to={'/'} className="button button-secondary">
              Return to List
            </Link>
          )}
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
