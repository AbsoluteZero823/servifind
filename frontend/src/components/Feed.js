
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData';
// import Transaction from './Transaction';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2';
import $ from 'jquery';
// import { getServices } from '../../../actions/serviceActions';
// import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'

// import { getTransactions, clearErrors, SingleTransaction, PaymentReceived, PaymentSent, TransactionDone } from '../../../actions/transactionActions';
// import { UPDATE_PSENT_RESET, UPDATE_PRECEIVED_RESET, UPDATE_TRANSACTIONDONE_RESET } from '../../../actions/transactionActions';
const Feed = () => {

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

        // dispatch(getTransactions())
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

    const submitReportHandler = (e) => {
        e.preventDefault();


        Swal.fire(
            'Reported Successfully!',
            '',
            'success'
        )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }
    const ClientTransactions = transactions.filter(function (ctransaction) {
        return ctransaction.inquiry_id.customer._id === user._id;
        console.log(ctransaction)
    });
    return (

        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    {/* <div className='firstTitle'>
                        Feed
                    </div> */}
                    {/* <div className='firstcontainer' style={{ maxWidth: '700px', marginTop: '50px' }}>
                        <article className="post post--is-loading">
                            <div className="post__loader">
                                <div className="loader__bar--1"></div>
                                <div className="loader__bar--2"></div>
                                <div className="loader__bar--3"></div>
                                <div className="loader__bar--4"></div>
                                <div className="loader__bar--5"></div>
                                <div className="loader__bar--6"></div>
                                <div className="loader__bar--7"></div>
                                <div className="loader__bar--8"></div>
                                <div className="loader__bar--9"></div>
                                <div className="loader__bar--10"></div>
                                <div className="loader__bar--11"></div>
                                <div className="loader__bar--12"></div>
                            </div>
                        </article>
                    </div>
                    <div className='firstcontainer' style={{ maxWidth: '700px' }}>
                        <article className="post post--is-loading">
                            <div className="post__loader">
                                <div className="loader__bar--1"></div>
                                <div className="loader__bar--2"></div>
                                <div className="loader__bar--3"></div>
                                <div className="loader__bar--4"></div>
                                <div className="loader__bar--5"></div>
                                <div className="loader__bar--6"></div>
                                <div className="loader__bar--7"></div>
                                <div className="loader__bar--8"></div>
                                <div className="loader__bar--9"></div>
                                <div className="loader__bar--10"></div>
                                <div className="loader__bar--11"></div>
                                <div className="loader__bar--12"></div>
                            </div>
                        </article>
                    </div> */}



                    <div className="card post" style={{ margin: 'auto', marginTop: "50px", flexDirection: 'column' }}>
                        <div className="post-header">
                            <div className="post-author-info">
                                <img src="https://pbs.twimg.com/media/CfIcHQEUsAA-LkR.jpg" />
                                <div>
                                    <div>
                                        <span className="author-name">Marvin Olazo</span>
                                        <i className="verified-icon"></i>
                                    </div>
                                    <div className="details">
                                        <span>4h</span>
                                        <span> · </span>
                                        <i className="post-settings-icon"></i>
                                    </div>
                                </div>
                            </div>
                            <i className="post-menu-icon"></i>
                        </div>

                        <p className="post-body">Kailangan ko po ng gumagawa ng Logo para sa business ko, As soon as possible sana please willing to pay po.</p>
                        {/* <a className="post-image">
                            <img src="images/feed-image-1.jpg" />
                            <div className="excerpt">
                                <div className="post-info-icon-wrap">
                                    <i className="post-info-icon"></i>
                                </div>
                                <label>bloomberg.com</label>
                                <h3>India’s Unusual Vaccine Problem: Plenty of Shots, But Few Takers</h3>
                                <span>Most of the world is struggling to secure enough vaccines to inoculate their populations. India has
                                    the opposite problem: Plenty of shots, but a shortage of people willing to take them.</span>
                            </div>
                        </a> */}
                        <div className="post-reactions">
                            {/* <div className="reactions">
                                <div className="emojis">
                                    <img src='/images/wow.svg' />
                                    <img src='/images/haha.svg' />
                                    <img src='/images/like.svg' />
                                </div>
                                <span>366</span>
                            </div>
                            <div className="comment-share">
                                <div>
                                    <span>121</span>
                                    <span>Comments</span>
                                </div>
                                <div className="shares">
                                    <span>48</span>
                                    <span>Shares</span>
                                </div>
                            </div> */}
                        </div>
                        <div className='dividerLine'></div>
                        <div className="post-actions">
                            <div className="actions">
                                <div className="action" data-toggle="modal" data-target="#MakeOfferModal">
                                    {/* <i className="like-icon"></i> */}
                                    <a href="#">
                                        <span>Make an Offer</span>
                                    </a>

                                </div>



                                {/* <div className="action">
                                    <i className="comment-icon"></i>
                                    <span>Comment</span>
                                </div>
                                <div className="action">
                                    <i className="share-icon"></i>
                                    <span>Share</span>
                                </div> */}
                            </div>
                            {/* <div className="interact-as">
                                <img src="images/profile-40.jpg" />
                                <i className="dropdown-icon-small"></i>
                            </div> */}
                        </div>

                    </div>
                </Fragment>
            )
            }

            {/* MAKE OFFER MODAL */}
            <Fragment>
                <div className="modal fade" id="MakeOfferModal" tabIndex="-1" role="dialog" aria-labelledby="MakeOfferModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '700px' }}>
                        <div className="modal-content" >
                            <div className="modal-header">
                                <h5 className="modal-title" id="MakeOfferModalTitle">Make Offer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form className="a" onSubmit={submitReportHandler} encType='multipart/form-data' >
                                <div className="modal-body">

                                    <div style={{ padding: '10px 10px' }}>
                                        {/* populate the service of the logged in freelancer */}
                                        <label htmlFor="reason">Service:</label>

                                        <select
                                            name="reason"
                                            id="reason"
                                            className='form-control'
                                        // value={reason}
                                        // onChange={(e) => setReason(e.target.value)}
                                        >
                                            <option value="">Select Service</option>
                                            <option value="spam">Spam</option>
                                            <option value="harassment">Harassment</option>
                                            <option value="inappropriate-content">Inappropriate Content</option>
                                        </select>
                                        {/* <br />
                                        <label>Description: </label>
                                        <textarea
                                            name="description"
                                            id="description" className="form-control mt-3"
                                            style={{ minHeight: '200px' }}
                                        // value={description}
                                        // onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </textarea> */}
                                    </div>








                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Submit</button>


                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment >
    );
}
export default Feed
