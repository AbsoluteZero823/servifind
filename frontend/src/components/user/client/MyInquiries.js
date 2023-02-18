import React, { Fragment, useRef, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'


import swal from 'sweetalert';


const MyInquiries = () => {
 

  
    return (
        
  <Fragment>
    <div style={{marginLeft:'10vh', marginRight:'10vh', marginTop:'5vh'}}>
    <h2>
        My Inquiries
    </h2>



    <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display:'flex'}}>
		<img className='imgcard'  src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4='></img>
        {/* {users && users.map((user, index) => (

service.user_id === users[index]._id && (

    <div className='freelancer-info'>
        <img
            src={user.avatar && user.avatar.url}
            alt={users && users.name}
            key={service._id}
            className="rounded-img"
        />
       
        <a className='black-name'>{user.name}</a>
        
    </div>
)

))} */}
<div className="card__label">adwaa</div>
		<div className="card__inqcontent">
			
			<h4 className="card__info">Service: drawing</h4>
			{/* <p>{service.title}</p> */}
			
      {/* <p><span className="fw7">sserse</span></p> */}
      
      {/* picture and name */}
      <h7 className="card__info">status: pending</h7>
      <div className='row' style={{display: 'flex', flexDirection:'row', flex: '50%'}}>
                            <div style={{width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',}}>
                        <img src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4=' style={{ height: 25,
        width: 'auto'}}></img>
                        </div>
                        <center className="justified" href="" style={{fontSize:'20px'}}>service.user.name</center>

                        </div>
                        <h7 className="card__info">Date inquired: 02/13/2023</h7>
        {/* end picture and name */}
		
		</div>
        <div className="card__btn-container">
				<button className="card__btn">
                
                    
                   
                <Link to={''}>Service Details</Link>

                </button><button className="card__btn">
                
                    
                   
                <Link to={''}>Cancel</Link>

                </button>
			</div>
	</div>




    <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display:'flex'}}>
		<img className='imgcard'  src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4='></img>
        {/* {users && users.map((user, index) => (

service.user_id === users[index]._id && (

    <div className='freelancer-info'>
        <img
            src={user.avatar && user.avatar.url}
            alt={users && users.name}
            key={service._id}
            className="rounded-img"
        />
       
        <a className='black-name'>{user.name}</a>
        
    </div>
)

))} */}
<div className="card__label">adwaa</div>
		<div className="card__inqcontent">
			
			<h4 className="card__info">Service: drawing</h4>
			{/* <p>{service.title}</p> */}
			
      {/* <p><span className="fw7">sserse</span></p> */}
      
      {/* picture and name */}
      <h7 className="card__info">status: pending</h7>
      <div className='row' style={{display: 'flex', flexDirection:'row', flex: '50%'}}>
                            <div style={{width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',}}>
                        <img src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4=' style={{ height: 25,
        width: 'auto'}}></img>
                        </div>
                        <center className="justified" href="" style={{fontSize:'20px'}}>service.user.name</center>

                        </div>
                        <h7 className="card__info">Date inquired: 02/13/2023</h7>
        {/* end picture and name */}
		
		</div>
        <div className="card__btn-container">
				<button className="card__btn">
                
                    
                   
                <Link to={''}>Service Details</Link>

                </button><button className="card__btn">
                
                    
                   
                <Link to={''}>Cancel</Link>

                </button>
			</div>
	</div>




    <div className="card" id='card-rectangle' style={{ justifyContent: 'space-between', display:'flex'}}>
		<img className='imgcard'  src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4='></img>
        {/* {users && users.map((user, index) => (

service.user_id === users[index]._id && (

    <div className='freelancer-info'>
        <img
            src={user.avatar && user.avatar.url}
            alt={users && users.name}
            key={service._id}
            className="rounded-img"
        />
       
        <a className='black-name'>{user.name}</a>
        
    </div>
)

))} */}
<div className="card__label">adwaa</div>
		<div className="card__inqcontent">
			
			<h4 className="card__info">Service: drawing</h4>
			{/* <p>{service.title}</p> */}
			
      {/* <p><span className="fw7">sserse</span></p> */}
      
      {/* picture and name */}
      <h7 className="card__info">status: pending</h7>
      <div className='row' style={{display: 'flex', flexDirection:'row', flex: '50%'}}>
                            <div style={{width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',}}>
                        <img src='https://media.istockphoto.com/photos/beautiful-sunset-over-the-tropical-sea-picture-id1172427455?b=1&k=20&m=1172427455&s=612x612&w=0&h=5e5ZY9KtcF86MolxsA1j_MgylIMjMJqXcqnOONVypO4=' style={{ height: 25,
        width: 'auto'}}></img>
                        </div>
                        <center className="justified" href="" style={{fontSize:'20px'}}>service.user.name</center>

                        </div>
                        <h7 className="card__info">Date inquired: 02/13/2023</h7>
        {/* end picture and name */}
		
		</div>
        <div className="card__btn-container">
				<button className="card__btn">
                
                    
                   
                <Link to={''}>Service Details</Link>

                </button><button className="card__btn">
                
                    
                   
                <Link to={''}>Cancel</Link>

                </button>
			</div>
	</div>

    </div>
  </Fragment>
    )
};

export default MyInquiries;