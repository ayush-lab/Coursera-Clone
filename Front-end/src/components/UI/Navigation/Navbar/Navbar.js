import React, {Component} from 'react';
import './Navbar.css';
import {NavLink,Redirect} from 'react-router-dom';
import Logo from '../../../UI/Logo/Logo';
import AuthServices from '../../../../ApiServices/auth.service';

class Navbar extends Component {
    
    state = {
        isLoggedIn:false,
        userName:"Profile",
        redirect:null,
    }

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
         
        }

    
        
     }

     logout=() => {
       this.setState({redirect:"/login"})
        AuthServices.logout();


    }



    render(){


       if (this.state.redirect) {
            return <Redirect to="/login" />
        }

      
        let LoginLinks = ( <ul className="navbar-nav ml-auto">


        <li className="nav-item" data-toggle="tooltip" data-placement="top"
         title="Create Your Course">
          
          <NavLink to="/teacherhome" activeClassName="teacherActive"
           className="nav-link teachLink">Teach on Shelp</NavLink>
        </li>
      
       
        <li className="nav-item">
          <NavLink to="/Cart" className="nav-link "> 
          <i data-toggle="tooltip" data-placement="top" title="Bookmarked Courses"
           className="fa fa-heart" aria-hidden="true"><span id="bookmarkNav"> Bookmarked</span></i></NavLink>
         
        </li>
       
       {/* <li className='nav-item '>
        <NavLink to="/"  
        className="nav-link profileName">
              {this.state.userName}</NavLink>
        </li> */}


        <li className="nav-item">
          <NavLink to="/" className="nav-link logoutlink" onClick={this.logout}>Logout</NavLink>
         
        </li>
      </ul>
      );

      if(localStorage.getItem('user') === null){

        LoginLinks =( <ul className="navbar-nav ml-auto">

               

                <li className="nav-item">
                
                <NavLink to="/signup" activeClassName="btnactive" className="nav-link Signupbtn">Signup</NavLink>
                
                </li>
            
                <li className="nav-item">
                <NavLink to="/login" activeClassName="btnactive" className="nav-link Loginbtn">Login</NavLink>
                
                </li>

                
               
      </ul>
        )}

       
    return(
  

<nav className=" navbar navbar-expand-lg sticky-top ">

  <NavLink to="/home/all" className="navbar-brand"><Logo/></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
   aria-label="Toggle navigation">
  <i className="fa fa-bars" aria-hidden="true"></i>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">

    <li className="nav-item dropdown" >
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <NavLink  className="dropdown-item" to='/home/all' activeClassName="active-categoryMenu" >All Courses</NavLink>
                   <NavLink className="dropdown-item" to='/home/Web Development' activeClassName="active-categoryMenu">Web Development </NavLink>
                   <NavLink className="dropdown-item" to='/home/Web Designing' activeClassName="active-categoryMenu" >Web Designing </NavLink>
                   <NavLink className="dropdown-item" to='/home/React' activeClassName="active-categoryMenu">React</NavLink>
                    <NavLink className="dropdown-item" to='/home/NodeJs' activeClassName="active-categoryMenu">NodeJs</NavLink>
                   <NavLink className="dropdown-item" to='/home/ML' activeClassName="active-categoryMenu">Machine Learning </NavLink>
                   <NavLink className="dropdown-item" to='/home/Photography' activeClassName="active-categoryMenu">Photography</NavLink>
                   <NavLink className="dropdown-item" to='/home/IOT' activeClassName="active-categoryMenu">IOT </NavLink>


           
            </div>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" 
      placeholder="Search Courses" aria-label="Search"/>
      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
    </form>

    {LoginLinks}
    
  </div>
</nav>

)}
};

export default Navbar;