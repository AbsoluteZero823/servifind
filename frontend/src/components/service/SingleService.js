import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateService, getServiceDetails, clearErrors } from '../../actions/serviceActions'
import { UPDATE_SERVICES_RESET } from '../../constants/serviceConstants'

const SingleService = () => {

    const [description, setDescription] = useState('')


    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.updelService);
    const { service } = useSelector(state => state.serviceDetails)
    // const { loading, error, services } = useSelector(state => state.services);
    const { id } = useParams();

    useEffect(() => {


        if (service && service._id !== id) {
            dispatch(getServiceDetails(id))
        } else {
            setDescription(service.description);
            
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Service updated successfully')

            navigate('/services')

            dispatch({
                type: UPDATE_SERVICES_RESET,

            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, service])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('description', description);

        // formData.set('status', status);

        dispatch(updateService(service._id, formData))
    }

  

    return (
        <Fragment>
         <div className='row ey' style={{paddingLeft:'-10 !important'}}>
<div className='1st' style={{backgroundColor:"#FFD4D4", width: "30%", paddingLeft:'-5px'}}>
{/* <h3>fritgrogrotiko</h3> */}
<center>
<img
            src={service.user && service.user.avatar.url}
            alt={service.user && service.user.name}
            key={service._id}
            className="rounded-img-big"
            
            style={{marginTop: '30px'}}
        />


<div className='row'>
<button class="custom-btn btn-5" style={{margin:'20px'}} data-toggle="modal" data-target="#exampleModalCenter"><span style={{margin:'10px'}}>Inquire</span></button>
<button class="custom-btn btn-5" style={{margin:'20px'}}><span>Read More</span></button>
</div>
</center>

</div>
<div className='2nd' style={{backgroundColor:"red", width: "70%"}}></div>

         </div>


         <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Inquire</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="email_field">Instruction</label>
                                            <textarea
                type="text"
                placeholder="Instruction for the freelancer"
                className="form-control"
                // value={formData.instruction}
                // onChange={(e) => {
                //     setFormData({ ...formData, instruction: e.target.value });
                // }}
            />
                                        </div>

                                        <label>Attachments</label><br></br>
                                        <input type="file" id="exampleInputFile" name="my_file"></input>
                                      

                                    

                         


                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </Fragment>
    )
}

export default SingleService