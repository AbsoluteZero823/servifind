
import React, { Fragment, useState, useEffect } from 'react'

import { Link, useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';

import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';
import { newRequest } from '../../../actions/requestActions';
import { useNavigate } from 'react-router-dom';
import { getRequests, clear } from '../../../actions/requestActions';


import moment from 'moment/moment'



const ManageRequest = () => {


    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();


    // const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { loading, error, requests } = useSelector(state => state.requests);

    // const { success } = useSelector(state => state.addRequest);



    useEffect(() => {
        // dispatch(getCategories())
        dispatch(getRequests())
        // if (success) {
        //     navigate('/manage-request');
        //     // alert.success('Service created successfully');
        //     Swal.fire(
        //         'Request Successfully Created!',
        //         '',
        //         'success'
        //     )
        //     dispatch({ type: NEW_CATEGORY_RESET })
        // }

    }, [dispatch, alert, error, navigate])



    // SET CLIENT TRANSACTION
    const setClientTransactions = () => {

        const data = {
            columns: [

                {
                    label: 'Date',
                    field: 'created_At'

                },

                {
                    label: 'Request/Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'request_status',
                    sort: 'asc'
                },

                {
                    label: 'Offers',
                    field: 'offers',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const MyRequests = requests.filter(function (myrequest) {
            return myrequest.requested_by._id === user._id;

        });

        MyRequests.forEach(request => {
            data.rows.push({

                created_At: moment(request.created_At).format('MMM/DD/yy'),
                description: request.description,
                request_status: request.request_status,

                offers: <Fragment>
                    <div className='offers'>

                    </div>
                </Fragment>,

                actions: <Fragment>
                    <div className='action'>

                    </div>
                </Fragment>

            })
        })

        return data;
    }



    return (

        <Fragment>
            <MetaData title={'Manage Requests'} />
            <div className='container' style={{ marginTop: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0px' }}>
                    <div><h1 style={{ color: 'black' }}>Manage Requests</h1></div>
                    <div >
                        <Link to={'/post-request'}><button className='nav-button'>Post a Request</button></Link>
                    </div>
                </div>
            </div>
            <Fragment>
                {loading ? <Loader /> : (
                    <MDBDataTable
                        data={setClientTransactions()}
                        className="px-3"
                        bordered
                        striped
                        hover
                        id='mdbtable'
                    />
                )}
            </Fragment>
        </Fragment>
    );
}
export default ManageRequest
