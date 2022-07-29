import React, {useContext, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {Context} from '../Context'
import UserSignIn from "./UserSignIn";

//make stateful component
const CreateCourse = (props) => {
    const history = useHistory();
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [time, setTime] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const {data, authenticatedUser} = useContext(Context)
    const [course, setCourse] = useState({
        title:'',
        description:'',
        time:'',
        materials:'', 
    })

    const handleOnChange = (e) => {

        const { name, value }  = e.target
        console.log(e.target.value);
        console.log(e.target.name);
        setCourse((course) => ({...course, [name]: value}))
    }
   
    const handleOnSubmit = (e) => {
        e.preventDefault();
        data.createCourse(course, authenticatedUser).then(errors => {
            if(errors.length){
            setErrors(errors);
            } else {
                history.push('/')
            }
        }).catch(error => {
            history.push("/error")
        })

        const course = {
            title,
            description,
            time,
            materials, 
            useId: data.authenticatedUser.id
            
        }
        console.log(data.authenticatedUser);
    }
  return (
    <div className="wrap">
    <h2>Create Course</h2>
    <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
        </ul>
    </div>
    <form onSubmit={handleOnSubmit}>
        <div className="main--flex">
            <div>
               <label htmlFor="courseTitle">Course Title</label>
               <input id="title" name="title" type="text" value={course.title} onChange={handleOnChange}
            />
                {/* <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={handleOnChange}/> */}

                <p>By Joe Smith</p>

               <label htmlFor="courseDescription">Course Description</label>
                <textarea id="description" name="description" value={course.description} onChange={handleOnChange}></textarea>
            </div>
            <div>
               <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="time" type="text" value={course.time} onChange={handleOnChange}/>

               <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materials" value={course.materials} onChange={handleOnChange}></textarea>
            </div>
        </div>
        <button className="button" type="submit" onClick={handleOnSubmit}>Create Course</button>
        <Link className="button button-secondary" to={"/"}>
          Cancel
        </Link>
    </form>
</div>
  )
}

export default CreateCourse;