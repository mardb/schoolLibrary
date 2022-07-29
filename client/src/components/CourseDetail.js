import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import {Link, useParams, useNavigate, useHistory} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted. 
import Data from "../Data";


//change to stateful component

const CourseDetail = (props) => {
    
const history = useHistory();
const [course, setCourse] = useState(null)
const [edit, setEdit] = useState(false)
// const {data, authenticatedUser} = useContext(Context)
const {id} = useParams()

const url = 'http://localhost:5000/api'
fetch(`${url}/courses/${id}`)
.then(res => res.json()).then(data => {
  console.log(data)
  return data
}
);

useEffect(() =>{
//     data.courseDetail(id)
// .then(response => setCourse(response))
// .catch(error => {
//     console.log(error);
//     history.push('/notfound');
// })
},[])


  return(
<>
<div className="actions--bar">
                <div className="wrap">
                    <button className="button" href="update-course.html">Update Course</button>
                    <button className="button" href="#">Delete Course</button>
                    <Link to={'/'} className="button button-secondary">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">Build a Basic Bookcase</h4>
                            <p>By firstName lastName </p>
                        {/*  React markdown her*/}
                            <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {/* jsx for time */}
                            <p>14 hours</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {/* React markdown here  */}
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
      </>
 
  )
}
 export default CourseDetail;