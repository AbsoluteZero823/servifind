import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allUsers } from '../../actions/userActions'

const Service = ({ service, users }) => {




    const dispatch = useDispatch();
    // const { users } = useSelector(state => state.users)
    const alert = useAlert();


    const names = []
    const nameses = []

    useEffect(() => {
        // dispatch(allUsers())

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }
        // for (let index = 0; index < 3; index++) {

        //     if (service.user_id == users[index]._id) {
        //         const i = index;
        //         console.log(i)
        //     }


        // }

    }, [dispatch, alert])



    return (


	<div className="card">
		<img className='imgcard'  src={service.image}></img>
        {users && users.map((user, index) => (

service.user_id === users[index]._id && (

    <div className='freelancer-info'>
        <img
            src={user.avatar && user.avatar.url}
            alt={users && users.name}
            key={service._id}
            className="rounded-img"
        />
        {/* <a>adw</a> */}
        <a className='black-name'>{user.name}</a>
        
    </div>
)

))}
		<div className="card__content">
			<div className="card__label">{service.category.name}</div>
			<h2><a href="https://konrad.design" className="card__link" target="_blank">{service.user.name}</a></h2>
			{/* <p>{service.title}</p> */}
			
      <p><span className="fw7">{service.title}</span></p>
      
      {/* picture and name */}
      <div className='row' style={{display: 'flex', flexDirection:'row'}}>
                            <div style={{width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',}}>
                        <img src={service.user.avatar.url} style={{ height: 25,
        width: 'auto'}}></img>
                        </div>
                        <center className="justified" href="">{service.user.name}</center>
                        </div>

        {/* end picture and name */}
			<div className="card__cta-container">
				<button className="card__cta">View Details</button>
			</div>
		</div>
	</div>

    )
}
export default Service