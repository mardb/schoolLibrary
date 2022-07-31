import React, { useContext, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context'
import UserSignIn from "./UserSignIn";

//make stateful component
const CreateCourse = (props) => {
    // const history = useHistory();
    const { data, actions, authenticatedUser, createUser } = useContext(Context);
    // const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [formerState, setFormerState] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        // firstName:authenticatedUser.id,
        // lastName:authenticatedUser.lastName,
        // userId: authenticatedUser.userId,
    })

    const handleChange = (e) => {

        const { name, value } = e.target
        console.log(e.target.value);
        console.log(e.target.name);
        setFormerState({ ...formerState, [name]: value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.createCourse(formerState);
          } catch (error) {
            console.log(error);
            setErrors([error]);
          }
        };

    // .then(errors => {
    //         if(errors.length){
    //         setErrors(errors);
    //         } else {
    //             actions.createCourse(
    //                 course.title, 
    //                 course.password, 
    //                 course.description,
    //                 course.estimatedTime,
    //                 course.materialsNeeded )
    //             .then(() => history.push('/'))
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         history.push("/error")
    //     })

    //     const course = {
    //         title,
    //         description,
    //         time,
    //         materials, 
    //         //im getting this from data.js 
    //         useId: data.authenticatedUser.user.id

    //     }
    //     console.log(data.authenticatedUser.user.id
    //         );

    // }


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
                        <input id="title" name="title" type="text" value={formerState.title} onChange={handleChange}
                        />
                        {/* <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={handleOnChange}/> */}

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="description" name="description" value={formerState.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="time" type="text" value={formerState.time} onChange={handleChange} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materials" value={formerState.materials} onChange={handleChange}></textarea>
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