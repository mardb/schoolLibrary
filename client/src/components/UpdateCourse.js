import React 
, { useEffect, useContext,  useState, prevState}  
from 'react';
import {Context} from '../Context';

import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted.
import Data from '../Data';

const UpdateCourse = (props) => {
console.log(props);    
let history = useHistory()
    console.log('hello');
    const { 
      data, 
      actions, 
      authenticatedUser, createUser
    } = useContext(Context);
    console.log(useContext(Context));   
    // console.log(useContext(Context));
    const [errors, setErrors] = useState([])
    const { id } = useParams();
//similar to createCourse useState
    const [course, setCourse] = useState({
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      // userId: authenticatedUser.id,
    });//look up prev state
//old.. will uncomment later.. trying fetch with path
// useEffect((data)=>{
//   // console.log(data.user.id,);
//     data.courseDetail(data.id)
//       .then((course) => { setCourse({
//         id: id,
//         title: course,
//         description: "",
//         estimatedTime: "",
//         materialsNeeded: "",
   
//       })
        
        
//         }).catch((err) => console.log(err))
// },[]);
//put back after
// },[data, id]);
// console.log(data.user.id);
//same as above but directly
// useEffect(()=>{
//   const url = 'http://localhost:5000/api';
//   fetch(`${url}/courses/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//   console.log(data.course);
//        data.updateCourse(data.course);

//   });

useEffect((data) => {
  const url = 'http://localhost:5000/api';
  fetch(`${url}/courses/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.course);
      setCourse(data.course);
   
    });
  //     data.courseDetail(id)
  // .then(response => setCourse(response))
  // .catch(error => {
  //     console.log(error);
  //     history.push('/notfound');
  // })
}, []);


//similar to signup
const handleSubmit = (e) => {
    e.preventDefault();
    data.UpdateCourse(course, authenticatedUser)
    .then((errors) => {
      if (errors.length) {
        setErrors(errors, id);
      } else {
        history.push('/courses/${id}')
      }
    })
    .catch((err) => {
      console.log(err);
      history.push('/error');
    })
  };


  // const cancel = () => {
  //   history.push('/');
  // };


const handleChange= (e)=>{
    e.preventDefault()
    const {name, value} = e.target;
    data.setCourse((prevState) => ({
        ...course,
        [name]: value
    }))
}





const handleDelete = (id) => {
  data.setCourse( prevState => {
    return {
      courses: prevState.courses.filter(course => course.id !== id)
    }
  })
}

console.log(course.title);



  return(
    <div className="wrap">
        <h2>Update Course</h2>
        <form>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name='courseTitle' type="text" value={course.title} onChange={handleChange}/>

                    <p>
                      {/* By {course.user.firstName} {course.user.lastName}{' '} */}
                    </p>

                    <label htmlFor="courseDescription">Course Description</label>
                    {/* <textarea id="courseDescription" name="courseDescription" 
                    // defaultValue={course.description} 
                    onChange={handleChange}></textarea> */}
                    <textarea 
                    id="courseDescription" 
                    name="courseDescription" 
                    value={course.description} 
                    onChange={(e) => 
                    setCourse(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" 
                    defaultValue={course.estimatedTime}
                     onChange={handleChange} />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    {/* <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} defaultValue="hi"> lalala </textarea> */}
                    <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={(e) => setCourse(e.target.value)}></textarea>
                </div>
            </div>
            <button className="button" type="submit">Update Course</button>
            <Link className="button button-secondary"  to={'/courses/${id}'}>Cancel</Link>
        </form>
    </div>
  )
}

export default UpdateCourse;
