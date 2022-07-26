import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import { Link, useParams, useHistory } from 'react-router-dom';

const UpdateCourse = () => {
  //for navigation
  let history = useHistory();
  //extracts auth user from context
  const { authenticatedUser } = useContext(Context);
  //extracts id from  URL params
  const { id } = useParams();
  //sets course to empty fields to begin.
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/api';
    fetch(`${url}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
      });
  }, []);
//makes a call to the API then checks for user auth 
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({ ...course, userId: authenticatedUser.id });
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
          ).toString('base64'),
      },
      body: body,
    }).then((response) => {
      //success in course update 
      if (response.status === 204) {
        console.log('Course was updated!');
        history.push(`/courses/${id}`);
        //checks for errors and sets errors that display on screen. 
      } else if (response.status === 400) {
        return response.json().then((data) => {
          setErrors(data.errors);
        });
      } else {
        throw new Error();
      }
    });
  };
//when user inputs keys, this function captures then changes made 
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCourse((prevState) => ({
      ...course,
      [name]: value,
    }));
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {/* displays validation errors */}
      {errors.length !== 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={course.title}
              onChange={handleChange}
            />

            <p>
              {/* By {course.user.firstName} {course.user.lastName}{' '} */}
            </p>

            <label htmlFor="description">Course Description</label>
            {/* <textarea id="courseDescription" name="courseDescription" 
                    // value={course.description} 
                    onChange={handleChange}></textarea> */}
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={(e) => setCourse(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            {/* <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} value="hi"> lalala </textarea> */}
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={course.materialsNeeded}
              onChange={(e) => setCourse(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Update Course
        </button>
        <Link className="button button-secondary" to={`/courses/${id}`}>
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateCourse;
