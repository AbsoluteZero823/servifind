
import React, { Fragment, useState, useEffect } from 'react'




import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2';
import $ from 'jquery';
import moment from 'moment/moment'

const Request = ({ request }) => {




    const alert = useAlert();
    const dispatch = useDispatch();


    // const { users } = useSelector(state => state.users)
    // const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);

    const { loading, error, transactions } = useSelector(state => state.transactions);
    const { loadings, detailserror, transaction } = useSelector(state => state.transactionDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth)


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



    }, [dispatch, alert, error]);



    const submitOfferHandler = (e) => {
        e.preventDefault();


        Swal.fire(
            'Offer sent Successfully!',
            '',
            'success'
        )
        //closes the modal
        $('.close').click();




        // dispatch(updateProfile(formData))

    }

    return (

        <Fragment>

            <div className="card post" style={{ margin: 'auto', marginTop: "50px", flexDirection: 'column' }}>
                <div className="post-header">
                    <div className="post-author-info">
                        <img src={request.requested_by.avatar.url} />
                        <div>
                            <div>
                                <span className="author-name">{request.requested_by.name}</span>
                                <i className="verified-icon"></i>
                            </div>
                            <div className="details">
                                <span>{moment(request.created_At).fromNow()}</span>
                                <span> · </span>
                                <i className="post-settings-icon"></i>
                            </div>
                        </div>
                    </div>
                    <i className="post-menu-icon"></i>
                </div>

                <p className="post-body">{request.description}</p>

                <div className="post-reactions">

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



                    </div>

                </div>

            </div>


            {/* MAKE OFFER MODAL */}

            <div className="modal fade" id="MakeOfferModal" tabIndex="-1" role="dialog" aria-labelledby="MakeOfferModalTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '700px' }}>
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="MakeOfferModalTitle">Make Offer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form className="a" onSubmit={submitOfferHandler} encType='multipart/form-data' >
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
                                        <option value="spam">service1</option>
                                        <option value="harassment">service2</option>
                                        <option value="inappropriate-content">service3</option>
                                    </select>
                                    <br />
                                    <label>Description: </label>
                                    <textarea
                                        name="description"
                                        id="description" className="form-control mt-3"
                                        style={{ minHeight: '200px' }}
                                    // value={description}
                                    // onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>
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

    );
}
export default Request
