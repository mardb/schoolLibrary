import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import {Link, useParams, useNavigate} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted. 

//change to stateful component
const CourseDetail = (props) => {
const [course, setCourse] = useState()
const [edit, setEdit] = useState(false)
const {data, authenticatedUser} = useContext(Context)
const {id} = useParams()


useEffect(() =>{
data.getCourse(id).then(response => setCourse(response)).catch(error => {
    console.log(error);
})
},[])

  return(
<>
      
 <div className="actions--bar">
        <div className="wrap">
            <button className="button" 
            // href="update-course.html"
            >Update Course</button>
            <button className="button" 
            // href="#"
            >Delete Course</button>
            <Link to={'/courses'}
            className="button button-secondary" 
            // href="index.html"
            >
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
                    <p>By {course.Users.firstName} {course.Users.lastName}</p>
                    <ReactMarkdown>{course.description}</ReactMarkdown>
                    {/* delete below once it renders */}
                    <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>

                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown className="course--detail--list">{course.materialsNeeded}</ReactMarkdown>
                    {/* <ul className="course--detail--list">
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                    </ul> */}
                </div>
            </div>
        </form>
    </div> 
    </>
  )
}
 export default CourseDetail;