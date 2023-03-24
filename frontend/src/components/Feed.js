
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
import { getCategories} from '../actions/categoryActions';
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
    const {categories } = useSelector(state => state.categories);
    // const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    // const [currentPage, setCurrentPage] = useState(1)
    // let { keyword } = useParams();


    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }
        dispatch(getCategories())
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

            <MetaData title={'Feed'} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className='firstcontainer' style={{paddingTop:'25px', boxShadow:'none'}}>
                        <div className='secondcontainer' style={{display:'flex'}}>

                            {/* sa mga transaction na */}
                            <div style={{ width:'70%', padding:'0px 10px'}}>
                                {/* dito nagsimula ang isang service */}

                                {requests && requests.map(request => (

                                    <Request key={request._id} request={request} />
                                ))}



                            </div>
<div style={{ width:'30%'}}>
<div className='card filter' style={{}}>
    <a style={{paddingBottom:'10px'}}>My Offers</a>
    <p style={{fontSize:'20px'}}>Category Filter</p>

<form>
    <label className="filterContainer">All
  <input type="radio" defaultChecked="checked" name="radio"/>
  <span className="checkmark"></span>
</label>
{categories.map((category) => (
    <label className="filterContainer" key={category._id} >{category.name}
  <input type="radio" name="radio" value={category._id} key={category._id} />
  <span className="checkmark"></span>
</label>
                                        // <option value={category._id}>{category.name}</option>
                                    
                                    ))}


</form>
</div>
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
