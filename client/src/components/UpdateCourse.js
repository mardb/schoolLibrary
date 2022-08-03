import React 
, { useEffect, useContext,  useState }  
from 'react';
import {Context} from '../Context';

import { Link, useParams, useHistory } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted.
// import Data from '../Data';

const UpdateCourse = (props) => {
console.log(props);    
let history = useHistory()
    console.log('hello');
    const { authenticatedUser} = useContext(Context);
    console.log(useContext(Context));   
    const { id } = useParams();

    const [course, setCourse] = useState({
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    });
    const [errors, setErrors] = useState([]);

useEffect((data) => {
  const url = 'http://localhost:5000/api';
  fetch(`${url}/courses/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setCourse(data.course);
   
    });
}, []);



const handleSubmit = (e) => {
       e.preventDefault()

  const body = JSON.stringify({...course, userId: authenticatedUser.id,});

  fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,
              'Authorization': 'Basic ' + Buffer.from(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`).toString("base64") 
      },
      body: body,
  })
      .then( response => {
          if (response.status === 204) {
              console.log("Course was updated!");
              history.push(`/courses/${id}`);
          } else if (response.status === 400){
              return response.json().then(data => {
                 setErrors( data.errors)
              });
          } else {
              throw new Error();
          }
      })
     
}



const handleChange= (e)=>{
    e.preventDefault()
    const {name, value} = e.target;
    setCourse((prevState) => ({
        ...course,
        [name]: value
    }))
}


console.log(course.title);



  return(
    <div className="wrap">
        <h2>Update Course</h2>
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
                    <input id="title" name='title' type="text" value={course.title} onChange={handleChange}/>

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
                    onChange={(e) => 
                    setCourse(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" 
                    value={course.estimatedTime}
                     onChange={handleChange} />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    {/* <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} value="hi"> lalala </textarea> */}
                    <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={(e) => setCourse(e.target.value)}></textarea>
                </div>
            </div>
            <button className="button" type="submit" onClick={handleSubmit}>Update Course</button>
            <Link className="button button-secondary"  to={`/courses/${id}`}>Cancel</Link>
        </form>
    </div>
  )
}

export default UpdateCourse;
