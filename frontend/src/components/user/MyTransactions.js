import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from '../admin/Sidebar'

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
        console.log(transactions)
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
    const setTransactions = () => {

        console.log(transactions)
        const data = {
            columns: [

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
                    label: 'Name',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Age',
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
                // {
                //     label: 'Actions',
                //     field: 'actions',
                // },
            ],
            rows: []
        }
        const FreelancerTransactions = transactions.filter(function (ftransaction) {
            return ftransaction.inquiry_id.freelancer == "63428bc505d15578996809fa";
        });

        FreelancerTransactions.forEach(transaction => {
            data.rows.push({

                isPaid: transaction.isPaid,
                // inquiry_id: transaction.inquiry_id,
                status: transaction.status,
                created_At: transaction.created_At,
                // contact: transaction.contact,
                // email: transaction.email,
                // role: transaction.role,
                // status: transaction.status,

                actions: <Fragment>
                    <Link to={''} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>




                    {/* {user && user.role === 'admin' && (
                        <Link to={`/user/${customer._id}`} className="btn btn-primary py-1 px-2 ml-2">
                            <i className="fa fa-pencil-alt"></i>
                        </Link>
                    )} */}
                    {/* {user && user.role === 'admin' && (
                        <Link to={`/user/${customer._id}`} className="btn btn-primary py-1 px-2 ml-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    )} */}
                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(customer._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}

                </Fragment>
            })
        })

        return data;
    }


    return (

        <Fragment>
            <MetaData title={'All Users'} />





            <Fragment>
                <h1 className="my-5">Transactions as a Freelancer
                    <span> <Link to="/create" className="btn update-btn fa fa-plus">
                    </Link> </span>
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



        </Fragment>
    )
}

export default MyTransactions