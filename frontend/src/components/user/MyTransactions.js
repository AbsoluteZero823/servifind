import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from '../admin/Sidebar'
// import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import moment from 'moment/moment'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import { allUsers, deleteUser, activateUser, deactivateUser, clearErrors } from '../../actions/userActions'
// import { DELETE_USER_RESET, ACTIVATE_USER_RESET, DEACTIVATE_USER_RESET } from '../../constants/userConstants'
import { getTransactions, clearErrors } from '../../actions/transactionActions'
const MyTransactions = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // const { loading, error, users } = useSelector(state => state.users);
    const { loading, error, transactions } = useSelector(state => state.transactions);
    const { user, isAuthenticated } = useSelector(state => state.auth)


    // const { isUpdated } = useSelector(state => state.user);
    // const { isDeleted } = useSelector(state => state.updelUser);
    // const { user } = useSelector(state => state.auth)
    // const {id} = useParams();
    useEffect(() => {
        dispatch(getTransactions());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(user)

        if (user) {
            console.log(user._id);
        }
        // if (isDeleted) {
        //     alert.success('User deleted successfully');
        //     navigate('/users');
        //     dispatch({ type: DELETE_USER_RESET })
        // }
        // if (isUpdated) {
        //     alert.success('User Updated successfully');
        //     navigate('/users');
        //     dispatch({ type: ACTIVATE_USER_RESET })
        //     dispatch({ type: DEACTIVATE_USER_RESET })
        // }

    }, [dispatch, alert, error, navigate])


    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }
    // const activateUserHandler = (id) => {
    //     dispatch(activateUser(id))

    // }
    // const deactivateUserHandler = (id) => {
    //     dispatch(deactivateUser(id))
    // }

    // SET FREELANCER TRANSACTION

    const setTransactions = () => {

        console.log(transactions)

        const data = {
            columns: [

                {
                    label: 'Client',
                    field: 'Client'

                },
                {
                    label: 'isPaid',
                    field: 'isPaid'

                },

                // {
                //     label: 'User ID',
                //     field: 'inquiry_id',
                //     sort: 'asc'
                // },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_At',
                    sort: 'asc'
                },
                // {
                //     label: 'Gender',
                //     field: 'gender',
                //     sort: 'asc'
                // },
                // {
                //     label: 'Contact Number',
                //     field: 'contact',
                //     sort: 'asc'
                // },
                // {
                //     label: 'Email',
                //     field: 'email',
                // },
                // {
                //     label: 'Role',
                //     field: 'role',
                // },
                // {
                //     label: 'Status',
                //     field: 'status',
                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const FreelancerTransactions = transactions.filter(function (ftransaction) {
            return ftransaction.inquiry_id.freelancer._id === user._id;

        });

        FreelancerTransactions.forEach(transaction => {
            data.rows.push({

                Client: transaction.inquiry_id.customer.name,
                isPaid: transaction.isPaid,
                // inquiry_id: transaction.inquiry_id,
                status: transaction.status,
                created_At: moment(transaction.created_At).format('MMM/DD/yy'),
                // contact: transaction.contact,
                // email: transaction.email,
                // role: transaction.role,
                // status: transaction.status,

                actions: <Fragment>
                    <Link to={''} className="btn btn-success py-1 px-2">
                        <i className="fa fa-check" data-toggle="tooltip" data-placement="bottom" title="Click if the work is done"></i>
                    </Link>




                    {/* {user && user.role === 'admin' && ( */}
                    <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Click if the client is Paid">
                        <i className="fa fa-hand-holding-usd"></i>
                    </Link>
                    {/* // )} */}
                    {/* {user && user.role === 'admin' && (
                        <Link to={`/user/${customer._id}`} className="btn btn-primary py-1 px-2 ml-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    )}
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(customer._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                </Fragment>
            })
        })

        return data;
    }

    // END FREELANCER TRANSACTION

    // SET CLIENT TRANSACTION
    const setClientTransactions = () => {

        console.log(transactions)

        const data = {
            columns: [

                {
                    label: 'Freelancer',
                    field: 'Freelancer'

                },
                {
                    label: 'isPaid',
                    field: 'isPaid'

                },

                // {
                //     label: 'User ID',
                //     field: 'inquiry_id',
                //     sort: 'asc'
                // },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_At',
                    sort: 'asc'
                },
                // {
                //     label: 'Gender',
                //     field: 'gender',
                //     sort: 'asc'
                // },
                // {
                //     label: 'Contact Number',
                //     field: 'contact',
                //     sort: 'asc'
                // },
                // {
                //     label: 'Email',
                //     field: 'email',
                // },
                // {
                //     label: 'Role',
                //     field: 'role',
                // },
                // {
                //     label: 'Status',
                //     field: 'status',
                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const ClientTransactions = transactions.filter(function (ctransaction) {
            return ctransaction.inquiry_id.customer._id === user._id;

        });

        ClientTransactions.forEach(ctransaction => {
            data.rows.push({

                Freelancer: ctransaction.inquiry_id.freelancer.name,
                isPaid: ctransaction.isPaid,
                // inquiry_id: transaction.inquiry_id,
                status: ctransaction.status,
                created_At: moment(ctransaction.created_At).format('MMM/DD/yy'),
                // contact: transaction.contact,
                // email: transaction.email,
                // role: transaction.role,
                // status: transaction.status,

                actions: <Fragment>
                    <Link to={''} className="btn btn-success py-1 px-2">
                        <i className="fa fa-check" data-toggle="tooltip" data-placement="bottom" title="Click if the work is done"></i>
                    </Link>




                    {/* {user && user.role === 'admin' && ( */}
                    {/* show QR of The freelancer */}
                    <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Make Payment">
                        <i className="fa fa-hand-holding-usd"></i>

                    </Link>
                    {/* // )} */}
                    {/* {user && user.role === 'admin' && (
                        <Link to={`/user/${customer._id}`} className="btn btn-primary py-1 px-2 ml-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    )}
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(customer._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                </Fragment>
            })
        })

        return data;
    }
    //END CLIENT TRANSACTION

    return (

        <Fragment>
            <MetaData title={'My Transactions'} />




            {user && user.role === 'freelancer' && (
                <Fragment>
                    <h1 className="my-5">Transactions as a Freelancer
                        {/* <span> <Link to="/create" className="btn update-btn fa fa-plus">
                    </Link> </span> */}
                    </h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setTransactions()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>

            )}
            <Fragment>
                <h1 className="my-5">Transactions as a Client
                    {/* <span> <Link to="/create" className="btn update-btn fa fa-plus">
                    </Link> </span> */}
                </h1>

                {loading ? <Loader /> : (
                    <MDBDataTable
                        data={setClientTransactions()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )}

            </Fragment>


        </Fragment>
    )
}

export default MyTransactions