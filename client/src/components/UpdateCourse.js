import React 
, { useEffect, useContext,  useState, prevState}  
from 'react';
import Context from '../Context';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
//allow CourseDetail component to retrieve their data from the REST API when those components are mounted.
import Data from '../Data';

const UpdateCourse = (props) => {
console.log(authenticatedUser);    
let history = useHistory()
    console.log('hello');
    const { 
      data, 
      actions, 
      authenticatedUser, createUser
    } = useContext(Context);
    // console.log(useContext(Context));
    const [errors, setErrors] = useState([])
    const { id } = useParams();
//similar to createCourse useState
    const [course, setCourse] = useState({
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: authenticatedUser.id,
    });//look up prev state
//old.. will uncomment later.. trying fetch with path
useEffect(()=>{
    authenticatedUser.courseDetail(id)
      .then((course) => { setCourse({
        title: '',
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
   
      })
        
        
        }).catch((err) => console.log(err))
},[data, id]);
//same as above but directly
// useEffect(()=>{
//   const url = 'http://localhost:5000/api';
//   fetch(`${url}/courses/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//   console.log(data.course);
//        data.updateCourse(data.course);

//   });
// },[])

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





  return(
    <div className="wrap">
        <h2>Update Course</h2>
        <form>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name={course} type="text" value={course.title}/>

                    <p>By Joe Smith</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription">High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.&#13;&#13;Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.&#13;&#13;Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.&#13;&#13;We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.&#13;&#13;As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.&#13;&#13;The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" value="14 hours" />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded">* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based Polyurethane</textarea>
                </div>
            </div>
            <button className="button" type="submit">Update Course</button>
            <Link className="button button-secondary"  to={'/courses/${id}'}>Cancel</Link>
        </form>
    </div>
  )
}

export default UpdateCourse;