import React from 'react';
import {Link} from 'react-router-dom';
import styles from './search.module.css';
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actions";



function Search(props){

    const [query,setQuery]=React.useState(false);
    const [isOpen,setOpen]=React.useState(false);

    React.useEffect(() => {
        let handler = (event) => {
          if (!searchNode.current.contains(event.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      }, []);
      
    const queryHandler =(event)=>{
        setQuery(event.target.value);
        setOpen(true)
    }
    const filteredSubjects = (courses,query)=>{
        if(!query){
            return props.Courses;
        }
        else{
            return courses.filter(course=>{
                const title=course.title.toLowerCase();
                const name=course.name.toLowerCase();

                return title.includes(query.toLowerCase()) || name.includes(query.toLowerCase()); 
            })
        }
    } 

    let SearchItems = filteredSubjects(props.Courses,query);
 
    // defining useref hook
    let searchNode = React.useRef();
    
    
    

    return (   
        <div>
        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" 
                placeholder="Search Courses" 
                aria-label="Search"
                onClick={()=>{setOpen(true)}}
                onChange={(event)=>queryHandler(event)}/>
            {/* <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button> */}
           
        </form>

            <div className={styles.searchItems} ref={searchNode}>
            {isOpen ? <ul>
                {SearchItems.map((item,index)=>{
                    return <Link key={index} to={`/course/all/${item._id}`} style={{textDecoration:'none'}}><li className={styles.name} key={index}>
                                        {item.title}
                                        <span className={styles.author}>- {item.name}</span></li>
                            </Link>
                })}
                    
                    </ul>
                : null}
            
            </div>
        </div>
  )
}


const mapStateToProps = (state) => {
    return {
         Courses: state.filter.Courses,
    };
  };

export default connect(mapStateToProps, null)(Search);