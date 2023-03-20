
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
import Transaction from './Transaction';
import Loader from '../../layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'

import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone } from '../../../actions/transactionActions';
import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../../actions/transactionActions';
const UserTransactions = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    const { loading, error, transactions } = useSelector(state => state.transactions);
    const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const [currentPage, setCurrentPage] = useState(1)
    // let { keyword } = useParams();

    useEffect(() => {


        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }


    }, [dispatch, alert])

    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }

        dispatch(getTransactions())
        if (user) {
            console.log(user._id);
        }


    }, [dispatch, alert, error]);

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }
    // let count = servicesCount;

    // if (keyword) {
    //     count = filteredServicesCount
    // }

    const ClientTransactions = transactions.filter(function (ctransaction) {
        return ctransaction.inquiry_id.customer._id === user._id;
        console.log(ctransaction)
    });
    return (

        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='firstcontainer'>
                        <div className='secondcontainer'>
                            <div className='stickyOne'>
                                <a className='selection'>All</a>
                                <a className='selection'>To Pay</a>
                                <a className='selection'>On Process</a>
                                <a className='selection'>To Rate</a>
                                <a className='selection'>Completed</a>
                            </div>

                            {/* sa mga transaction na */}
                            <div>
                                {/* dito nagsimula ang isang service */}

                                {ClientTransactions && ClientTransactions.map(transaction => (

                                    <Transaction key={transaction._id} transaction={transaction} />
                                ))}


                                {/* dito nagtapos ang isang service */}

                            </div>

                            {/* <MetaData title={'Buy Best Service Online'} />

                        <h1 id="animals_heading">Services</h1>
                        <section id="services" className="containerz mt-5">
                            <div className="row" style={{justifyContent: 'center'}}>
                                {services && services.map(service => (

                                    <Service key={service._id} service={service} />
                                ))}
                            </div>
                        </section> */}
                        </div>
                    </div>
                    {/* <MetaData title={'Buy Best Animals Online'} />
                    <h1 id="animals_heading">Latest Animals</h1>
                    <section id="animals" className="container mt-5">
                        <div className="row">
                            {animals && animals.map(animal => (
                                <Animal key={animal._id} animal={animal} />
                            ))}
                        </div>
                    </section> */}

                    {/* {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )} */}

                </Fragment>
            )
            }
        </Fragment >
    );
}
export default UserTransactions
