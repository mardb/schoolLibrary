import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

const CreateCourse = (props) => {
  const history = useHistory();
  // extracts properties from context
  const { data, authenticatedUser } = useContext(Context);
  //sets state of errors and course to empty
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: authenticatedUser.id,
  });
  //when keys are pressed, value is captured
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(authenticatedUser);
    e.preventDefault();
    try {
      const res = await data.createCourse(course, authenticatedUser);
      if (res.errors) {
        setErrors(res.errors);
      } else {
        history.push('/');
      }
    } catch (error) {
      console.log('no luck');
    }
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
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

      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={course.title}
              onChange={handleChange}
            />
            {/* <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={handleOnChange}/> */}

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.time}
              onChange={handleChange}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={course.materials}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button className="button" type="submit" onClick={handleSubmit}>
          Create Course
        </button>
        <Link className="button button-secondary" to={'/'}>
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;
