import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from '../admin/Sidebar'
// import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import moment from 'moment/moment'
import Swal from 'sweetalert2';
import $ from 'jquery';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import { allUsers, deleteUser, activateUser, deactivateUser, clearErrors } from '../../actions/userActions'
// import { DELETE_USER_RESET, ACTIVATE_USER_RESET, DEACTIVATE_USER_RESET } from '../../constants/userConstants'
import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone } from '../../actions/transactionActions'
import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../constants/transactionConstants'



const MyTransactions = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    

    // const { loading, error, users } = useSelector(state => state.users);
    const { loading, error, transactions } = useSelector(state => state.transactions);
    const { loadings,detailserror, transaction} = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
const{ isUpdated, loadingpayment} = useSelector(state => state.updatePayment)


const [transactionID,setTransactionID] = useState('')

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
        if (transactions) {
            console.log(transactions._id);
        }
        // if (isDeleted) {
        //     alert.success('User deleted successfully');
        //     navigate('/users');
        //     dispatch({ type: DELETE_USER_RESET })
        // }
        if (isUpdated) {
            
            
           
            dispatch({ type: UPDATE_PSENT_RESET })
            dispatch({ type: UPDATE_PRECEIVED_RESET })
        }

    }, [dispatch, alert, error, navigate, isUpdated])


    const transactionDetailsHandler = (id) => {
        dispatch(SingleTransaction(id))



    }
    const submitHandler = (e) => {
        e.preventDefault();
        const statusData = new FormData();
        statusData.set('paymentSent', 'true');
        Swal.fire({
            title: 'is Payment Done?',
            text: "If you pay thru Gcash, make sure to send the screenshot of the receipt to the freelancer.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment is done'
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(PaymentSent(transaction._id, statusData));
            
              Swal.fire(
                'Payment Sent!',
                'Wait for the freelancer to check your payment',
                'success'
              )
           //closes the modal
              $('.close').click(); 
       
            }
          })
        
   
    }

    const paymentReceivedHandler = (id) => {
        const statusData = new FormData();
        statusData.set('paymentReceived', 'true');


        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure this client is paid?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, payment Received'
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(PaymentReceived(id, statusData))
           
               
        Swal.fire(
            'Payment Received!',
            'Thank you',
            'success'
          )
           //closes the modal
              $('.close').click(); 
       
            }
          })


    }

    
    const confirmTransactionHandler = (id, workCompleted) => {
        const formData = new FormData();
        formData.set('freelancer', 'true');
        formData.set('client', 'true');
        formData.set('workCompleted', workCompleted);

        Swal.fire({
            title: 'Are you sure?',
            text: "Transaction is Done?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(TransactionDone(id, formData))
               
               
        Swal.fire(
            'Transaction Done!',
            'Thank you',
            'success'
          )
           //closes the modal
              $('.close').click(); 
       
            }
          })


    }

     
    const workDoneHandler = (id) => {
        const formData = new FormData();
        formData.set('freelancer', 'true');
        formData.set('client', 'false');

        Swal.fire({
            title: 'Are you sure?',
            text: "Did you already finish the work?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(TransactionDone(id, formData))
           
               
        Swal.fire(
            'Work Done!',
            'Thank you',
            'success'
          )
           //closes the modal
              $('.close').click(); 
       
            }
          })


    }
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
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_At',
                    sort: 'asc'
                },
          
                {
                    label: 'Payment Sent',
                    field: 'paymentSent'

                },
                {
                    label: 'Payment Received',
                    field: 'paymentReceived'

                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        const FreelancerTransactions = transactions.filter(function (ftransaction) {
            return ftransaction.inquiry_id.freelancer.user_id._id === user._id;

        });

        FreelancerTransactions.forEach(transaction => {
            data.rows.push({
                Client: transaction.inquiry_id.customer.name,
                status: transaction.status,
                created_At: moment(transaction.created_At).format('MMM/DD/yy'),
                paymentSent: transaction.paymentSent,
                paymentReceived: transaction.paymentReceived,
                
                actions: <Fragment>


                    {transaction.transaction_done && transaction.transaction_done.freelancer === 'false' && (
                    <Link to={''} className="btn btn-success py-1 px-2" onClick={() => workDoneHandler(transaction._id)} data-toggle="tooltip" data-placement="bottom" title="is Work done?">
                        <i className="fa fa-clipboard-check" ></i>
                    </Link>
                    )}

                    {/* {transaction.transaction_done && transaction.transaction_done.freelancer === 'true' && (
                    <Link to={''} className="btn py-1 px-2" data-toggle="tooltip" data-placement="bottom" title="Work is already Done - Not Clickable" disabled>
                        <i className="fa fa-clipboard-check" ></i>
                    </Link>
                    )} */}

                    {transaction && transaction.paymentReceived === 'false' && transaction.paymentSent === 'true' && (
                    <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Confirm if client is Paid" onClick={ ()=> (paymentReceivedHandler(transaction._id))}>
                        <i className="fa fa-hand-holding-usd" ></i>
                    </Link>
                    )}
                     {transaction && transaction.paymentSent === 'false' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Client is not paid yet - Not Clickable" disabled>
                        <i className="fa fa-hand-holding-usd" ></i>
                    </Link>
                    )}
                    {transaction && transaction.paymentReceived === 'true' && transaction.status === 'processing' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Payment is already Received - Not Clickable" disabled>
                        <i className="fa fa-hand-holding-usd" ></i>
                    </Link>
                    )}

                    <Link to={''} className="btn btn-danger py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Report this Client">
                        <i className="fa fa-exclamation-circle" ></i>
                    </Link>
                  
                    {/* {transaction && transaction.paymentReceived === 'true' && (
                    <Link to={''} className="btn btn-success py-1 px-2" onClick={() => confirmTransactionHandler(transaction._id)}>
                        <i className="fa fa-check" data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                    </Link>
                    )} */}

                  
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

        const data = {
            columns: [

                {
                    label: 'Freelancer',
                    field: 'Freelancer'

                },

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
 
                {
                    label: 'PaymentSent?',
                    field: 'paymentSent',
                },
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

                Freelancer: ctransaction.inquiry_id.freelancer.user_id.name,
                status: ctransaction.status,
                created_At: moment(ctransaction.created_At).format('MMM/DD/yy'),
                paymentSent:ctransaction.paymentSent,

                actions: <Fragment>
                    
                {ctransaction.paymentSent === 'false' && (
                    <Link to={''} className="btn btn-primary py-1 px-2 ml-2" data-toggle="modal" data-target="#PaymentDetailsModal" onClick={() => transactionDetailsHandler(ctransaction._id)}>
                        <i className="fa fa-coins"  data-toggle="tooltip" data-placement="bottom" title="Make Payment"></i>
                    </Link>
                 )}

{ctransaction.paymentSent === 'true' && ctransaction.status === 'processing' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="You already send payment" disabled>
                        <i className="fa fa-coins"></i>
                    </Link>
                 )}
                {ctransaction && ctransaction.paymentSent === 'false' && (
                    <Link to={''} className="btn btn-success py-1 px-2 ml-2" onClick={()=> Swal.fire(
                        'Warning!',
                        'You should proceed to make payment before clicking this button.',
                        'warning'
                      )}>
                        <i className="fa fa-check"  data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                    </Link>
                )}

                {ctransaction && ctransaction.paymentSent === 'true' && ctransaction.transaction_done.freelancer === 'true' && ctransaction.status === 'processing' && (
                    <Link to={''} className="btn btn-success py-1 px-2 ml-2" onClick={() => confirmTransactionHandler(ctransaction._id, ctransaction.transaction_done.workCompleted)}>
                        <i className="fa fa-check"  data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                    </Link>
                )}
                {ctransaction && ctransaction.paymentSent === 'true' && ctransaction.transaction_done.freelancer === 'false' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Work of Freelancer is not Done yet - Not Clickable">
                        <i className="fa fa-check"  ></i>
                    </Link>
                )}
                {/* {ctransaction && ctransaction.paymentSent === 'false' && (
                    <Link to={''} className="btn py-1 px-2 ml-2" disabled>
                        <i className="fa fa-check"  data-toggle="tooltip" data-placement="bottom" title="Confirm if the transaction is done"></i>
                    </Link>
                )} */}

                { ctransaction && ctransaction.transaction_done.client === 'true' && (
                    <div data-toggle="tooltip" data-placement="bottom" title="Review or Rate the Service">
                    <Link to={''} className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target="#PaymentDetailsModal" onClick={() => transactionDetailsHandler(ctransaction._id)} >
                        <i className="fa fa-star" ></i>
                    </Link>
                    </div>
                )}
                    <Link to={''} className="btn btn-danger py-1 px-2 ml-2" data-toggle="tooltip" data-placement="bottom" title="Report this Client" >
                        <i className="fa fa-exclamation-circle" ></i>
                    </Link>
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
                
                    </h1>

                    {(loading && loadingpayment) ? <Loader /> : (
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
                 
                </h1>

                {(loading && loadingpayment) ? <Loader /> : (
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



{/* PAYMENT MODAL */}
<Fragment>
            <div className="modal fade" id="PaymentDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="PaymentDetailsModalTitle" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '800px'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="PaymentDetailsModalTitle">Payment</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
            {loadings ? <Loader /> : (                         
                                    <div className="modal-body">
 
                                        <div className='row' >


<div className='sixty' style={{width: '60%', backgroundColor: 'transparent', padding:'10px'}}>
<img
            src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
            // alt={service.user && service.user.name}
            // key={service._id}
            // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            className="rounded-img-big"
            
            
        />
        <h4>Amount to pay: 100</h4>
        {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
<h4>Gcash Name: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_name}</h4>
<h4>Gcash Number: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_num}</h4>
</div>
<div className='forty' style={{width: '40%', backgroundColor: 'transparent', alignContent:'center', alignItems:'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>

    <img 
    src={transaction.inquiry_id && transaction.inquiry_id.freelancer.qrCode.url} 
    style={{ height: '250px', width: '250px', border: '5px solid', margin:'10px'}}
    
    
    />
<h4>Gcash QR Code</h4>
</div>


                                        </div>

                                       
                                      

                                    

                         


                                    </div>
)}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Payment Done</button>


                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                    </Fragment>

                    
{/* RATE SERVICE MODAL */}
<Fragment>
            <div className="modal fade" id="RateServiceModal" tabIndex="-1" role="dialog" aria-labelledby="RateServiceModalTitle" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '800px'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="RateServiceModalTitle">Rate Service</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
            {loadings ? <Loader /> : (                         
                                    <div className="modal-body">
 
                                        <div className='row' >


<div className='sixty' style={{width: '60%', backgroundColor: 'transparent', padding:'10px'}}>
<img
            src={transaction.inquiry_id && transaction.inquiry_id.freelancer.user_id.avatar.url}
            // alt={service.user && service.user.name}
            // key={service._id}
            // src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            className="rounded-img-big"
            
            
        />
        <h4>Amount to pay: 100</h4>
        {/* <h4>Gcash Name: {transaction.isPaid}</h4> */}
<h4>Gcash Name: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_name}</h4>
<h4>Gcash Number: {transaction.inquiry_id && transaction.inquiry_id.freelancer.gcash_num}</h4>
</div>
<div className='forty' style={{width: '40%', backgroundColor: 'transparent', alignContent:'center', alignItems:'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>

    <img 
    src={transaction.inquiry_id && transaction.inquiry_id.freelancer.qrCode.url} 
    style={{ height: '250px', width: '250px', border: '5px solid', margin:'10px'}}
    
    
    />
<h4>Gcash QR Code</h4>
</div>


                                        </div>

                                       
                                      

                                    

                         


                                    </div>
)}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Payment Done</button>


                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                    </Fragment>
        </Fragment>
    )
}

export default MyTransactions