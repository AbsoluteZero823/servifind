import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import Swal from 'sweetalert2';
import $ from 'jquery';


import { getApplicationPremium, clearErrors } from '../../actions/freelancerActions'

const ApplicationPremium = () => {

    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { applyingfreelancers, success, error, loading } = useSelector(state => state.applying)

    const [premiumReceipt, setPremiumReceipt] = useState('')

    useEffect(() => {
        dispatch(getApplicationPremium());
        if (success) {
            console.log(applyingfreelancers)
        }

        // if (isUpdated) {
        //     dispatch({ type: APPROVE_APPLICATION_RESET })
        //     dispatch({ type: REJECT_APPLICATION_RESET })
        // }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error, success])


    const setTableData = () => {

        const data = {
            columns: [

                {
                    label: 'Name',
                    field: 'name'

                },
                {
                    label: 'Course',
                    field: 'course'

                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },

                {
                    label: 'Contact Number',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'Premium Receipt',
                    field: 'premiumReceipt',
                    sort: 'asc'
                },

                {
                    label: 'Joined At',
                    field: 'created_At'

                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        applyingfreelancers.forEach(freelancer => {

            data.rows.push({


                name: freelancer.user_id.name,
                course: freelancer.course,
                email: freelancer.user_id.email,
                contact: freelancer.user_id.contact,

                created_At: moment(freelancer.user_id.created_At).format('MMM/DD/yy'),

                premiumReceipt: <Fragment>
                    <div className='centerTD'>
                        <img
                            className="anim"
                            src={freelancer.premiumReceipt.url}
                            style={{ margin: 'auto', display: 'flex' }}
                        />
                        <div className="overlay" data-toggle="modal" data-target="#ReceiptModal" onClick={() => setPremiumReceipt(freelancer.premiumReceipt.url)}>
                            <a className="icon" title="Eye" >
                                <i className="fa fa-eye fa-2xl" style={{ color: 'white' }}></i>
                            </a>
                        </div>
                    </div>

                </Fragment>,
                // resume: <Fragment>
                //     <div className='centerTD'>
                //         <img
                //             className="anim"
                //             src={freelancer.resume.url}
                //             style={{ margin: 'auto', display: 'flex' }}
                //         />
                //         <div className="overlay" data-toggle="modal" data-target="#ResumeModal" onClick={() => setResume(freelancer.resume.url)}>
                //             <a className="icon" title="Eye" >
                //                 <i className="fa fa-eye" style={{ color: 'white' }}></i>
                //             </a>
                //         </div>
                //     </div>
                // </Fragment>,
                actions: <Fragment>

                    <div className='action'>

                        <Link to={''} className="btn btn-success py-1 px-2"
                        // onClick={() => approveApplicationHandler(freelancer._id)}
                        >
                            <div data-toggle="tooltip" title='Approve Application'>
                                <i className="fa fa-check" ></i>
                            </div>
                        </Link>
                        <Link to={''} className="btn btn-danger py-1 px-2"
                        // onClick={() => rejectApplicationHandler(freelancer._id)}
                        >
                            <div data-toggle="tooltip" title='Reject Application'>
                                <i className="fa fa-times"></i>
                            </div>
                        </Link>



                    </div>

                </Fragment>
            })
        })

        return data;
    }
    return (
        <Fragment>
            <div className='forTable'>

                <div style={{ padding: '0', margin: '0' }}>
                    <h1 style={{ padding: '0 !important', margin: '0 !important' }}>Applications for Premium</h1>
                </div>

                <Fragment>
                    <MetaData title={'Application Entries'} />




                    {user && user.role === 'admin' && (
                        <Fragment>


                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setTableData()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    scrollY
                                    maxHeight='48vh'
                                />
                            )}

                        </Fragment>

                    )}








                </Fragment>




            </div>
            {/* SchoolID MODAL */}
            <Fragment>
                <div className="modal fade" id="ReceiptModal" tabIndex="-1" role="dialog" aria-labelledby="ReceiptModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ height: 'auto', width: 'auto', maxWidth: '80vw' }}>
                        <div className="modal-content" style={{ maxHeight: '90vh' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="SchoolIDModalTitle">Receipt</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img
                                src={premiumReceipt}
                                style={{ padding: '20px', objectFit: 'contain', maxHeight: '83vh' }}
                            />

                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default ApplicationPremium