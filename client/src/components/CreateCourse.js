import React, {useContext, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {Context} from '../Context'
import UserSignIn from "./UserSignIn";

//make stateful component
const CreateCourse = (props) => {
    const history = useHistory();
    const { data, actions, authenticatedUser, createUser } = useContext(Context);
    console.log(data);
    console.log(actions);
    console.log(authenticatedUser);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [time, setTime] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'', 
        // firstName:authenticatedUser.id,
        // lastName:authenticatedUser.lastName,
        // userId: authenticatedUser.userId,
    })

    const handleChange = (e) => {

        const { name, value }  = e.target
        console.log(e.target.value);
        console.log(e.target.name);
        setCourse({...course, [name]: value})

    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        data.createCourse(course, authenticatedUser).then(errors => {
            if(errors.length){
            setErrors(errors);
            } else {
                actions.createCourse(
                    course.title, 
                    course.password, 
                    course.description,
                    course.estimatedTime,
                    course.materialsNeeded )
                .then(() => history.push('/'))
            }
        }).catch(err => {
            console.log(err);
            history.push("/error")
        })

        const course = {
            title,
            description,
            time,
            materials, 
            //im getting this from data.js 
            useId: data.authenticatedUser.user.id
           
        }
        console.log(data.authenticatedUser.user.id
            );
   
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
    <form onSubmit={handleSubmit}>
        <div className="main--flex">
            <div>
               <label htmlFor="courseTitle">Course Title</label>
               <input id="title" name="title" type="text" value={course.title} onChange={handleChange}
            />
                {/* <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={handleOnChange}/> */}

                <p>By Joe Smith</p>

               <label htmlFor="courseDescription">Course Description</label>
                <textarea id="description" name="description" value={course.description} onChange={handleChange}></textarea>
            </div>
            <div>
               <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="time" type="text" value={course.time} onChange={handleChange}/>

               <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materials" value={course.materials} onChange={handleChange}></textarea>
            </div>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>Create Course</button>
        <Link className="button button-secondary" to={"/"}>
          Cancel
        </Link>
    </form>
</div>
  )
}

export default CreateCourse;