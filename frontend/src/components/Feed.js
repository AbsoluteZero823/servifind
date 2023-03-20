
import React, { Fragment, useState, useEffect } from 'react'
// import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData';
import Request from './Request';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';

// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'

import { getRequests, clear } from '../actions/requestActions';
// import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone } from '../../../actions/transactionActions';
// import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../../actions/transactionActions';
const Feed = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    const { loading, error, requests } = useSelector(state => state.requests);
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
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

        dispatch(getRequests())
        // if (user) {
        //     console.log(user._id);
        // }


    }, [dispatch, alert, error]);

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }
    // let count = servicesCount;

    // if (keyword) {
    //     count = filteredServicesCount
    // }


    return (

        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='firstcontainer'>
                        <div className='secondcontainer'>

                            {/* sa mga transaction na */}
                            <div>
                                {/* dito nagsimula ang isang service */}

                                {requests && requests.map(request => (

                                    <Request key={request._id} request={request} />
                                ))}



                            </div>

                        </div>
                    </div>

                </Fragment>
            )
            }
        </Fragment >
    );
}
export default Feed
