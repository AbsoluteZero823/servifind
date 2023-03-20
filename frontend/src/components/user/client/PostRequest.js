
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
// import MetaData from './layout/MetaData'
// import Animal from './animal/Animal'
// import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';




const Become = () => {


    const alert = useAlert();
    const dispatch = useDispatch();


    return (
        <Fragment>
            <div className='newstyle'>
                <div className='firstsection'>

                </div>
                <div className='secondsection'>

                </div>

            </div>
            {/* <section id='cm-intro'>
                <div className='intro'>
                    <div className='welcome' style={{ padding: '0px 100px' }}>

                        <h3 className='firstTitle'>Who are Eligible?</h3>

                        <div className='infoBody' style={{ display: 'flex', }}>
                            <div className='thirtyfive-percent'>
                                <img src='../images/students-college.png' ></img>
                            </div>
                            <div style={{ width: '65%', paddingLeft: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <div style={{ color: 'white', }}>
                                    <h3 className='' style={{ paddingBottom: '10px' }}>To apply for freelancer, user must:</h3>

                                    <h3 className=''>— Currently enrolled at Technological University of the Philippines Taguig Branch.</h3>
                                    <h3 className=''>— Uses a verified TUP email account.</h3>
                                    <h3 className=''>— Pass the requirements needed.</h3>

                                 

                                </div>
                                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                                </div>
                            </div>
                        </div>



                    </div>
                    <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

                </div>

            </section> */}


        </Fragment >
    );
}
export default Become
