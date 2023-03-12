import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'



const Transaction = ({ transaction }) => {
// console.log(users)

    const { user, isAuthenticated } = useSelector(state => state.auth)

    const dispatch = useDispatch();
  
    const alert = useAlert();


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


        <div className='servicecontainer'>
        {/* 1st div */}
        <div>
            <div style={{padding: '12px 24px', background:'#fff'}}>
                <div className='firsthalf'>
                    <div className='firstColumn'>
                        <div className='pictureDapat'>
                            mall
                        </div>
                        <div className='freelancer'>
                            {transaction.inquiry_id.freelancer.gcash_name}
                        </div>
                        <div style={{margin:'0 0 0 8px'}}>
                            <button className='viewShop'>view Service</button>
                        </div>
                       
                    </div>
                    <div>
                        <div style={{padding:'0 0 0 10px', display:'flex', alignItems:'center'}}>
                            <div style={{display:'block'}}>
                                <div>  parcel has been delivered </div>
                                <div>? </div>
                            </div>
                            <div className='statusDescription'>
                                Completed
                            </div>
                        </div>
                    </div>
                </div>

                <div className='dividerLine'></div>
                <a>
                    <div style={{display:'block'}}>
                        <div>
                            <span>
                                       <div style={{display:'block'}}></div>
                                        <div className='imagePriceColumn'>
                                            <div className='picFrame' style={{border:'1px solid #e1e1e1', background:'#e1e1e1'}}>
                                                <div style={{position:'relative'}}>
                                                    
                                                    <div>
                                                    <img  src={transaction.inquiry_id.service_id.image} className='picFrame'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                        
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        {/* 2nd div */}
        <div className='circlecut'>
            <div style={{left:'0', transform: 'translate(-50%,-50%)'}}></div>
            <div style={{right:'0', transform: 'translate(50%,-50%)'}}></div>
        </div>

        <div className='buttoncontainer'>
            <div className='bottomInfo'></div>
            <div style={{display:'flex', overflow:'hidden'}}>
                <div className='inTransDiv'>
                    <button className='buttonInTrans' style={{border:'1px solid transparent', backgroundColor:'#ee4d2d', color:'#fff'}}>Rate</button>
                </div>
                <div className='inTransDiv'>
                    <button className='buttonInTrans' style={{border:'1px solid rgba(0,0,0,.09)',  color:'#555'}}>Contact Seller</button>
                </div>
                <div className='inTransDiv'>
                    <button className='buttonInTransCircle' style={{backgroundColor:'transparent',  color:'red'}}> <i className="fas fa-exclamation-circle" data-toggle="tooltip" data-placement="bottom" title='Report this Freelancer'></i></button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Transaction