import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../../layout/Loader';

import { getFreelancerServices } from '../../../actions/serviceActions';

const MyServices = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { services, loading } = useSelector(state => state.services)
    const dispatch = useDispatch()

    useEffect(() => {


        if (user) {
            dispatch(getFreelancerServices(user.freelancer_id._id))
        }
    }, [])


    const setTableData = () => {

        const data = {
            columns: [

                {
                    label: 'Image',
                    field: 'images'

                },
                {
                    label: 'Name',
                    field: 'name'

                },
                {
                    label: 'category',
                    field: 'category',
                    sort: 'asc'
                },

                {
                    label: 'Price Starts At',
                    field: 'priceStarts_At',
                    sort: 'asc'
                },
                // {
                //     label: 'Created At',
                //     field: 'created_At'

                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        services.forEach(service => {

            data.rows.push({


                images: <Fragment>

                    <img
                        className="anim"
                        src={service.images.url}
                    />

                </Fragment>,
                name: service.name,
                category: service.category.name,
                priceStarts_At:
                    <Fragment>
                        <p>₱{service.priceStarts_At}</p>
                    </Fragment>
                ,

                // created_At: moment(freelancer.user_id.created_At).format('MMM/DD/yy'),

                actions: <Fragment>

                    <div className='action'>

                        {/* <Link to={''} className="btn btn-success py-1 px-2" onClick={() => approveApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Approve Application'>
                                <i className="fa fa-check" ></i>
                            </div>
                        </Link>
                        <Link to={''} className="btn btn-danger py-1 px-2" onClick={() => rejectApplicationHandler(freelancer._id)}>
                            <div data-toggle="tooltip" title='Reject Application'>
                                <i className="fa fa-times"></i>
                            </div>
                        </Link> */}



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
                    <h1 style={{ padding: '0 !important', margin: '0 !important' }}>My Services</h1>
                </div>

                <Fragment>
                    <MetaData title={'My Services'} />




                    {user && user.role === 'freelancer' && (
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




            </div >

        </Fragment>

    )
}

export default MyServices