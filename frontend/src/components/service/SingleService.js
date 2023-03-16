import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateService, getServiceDetails, clearErrors } from '../../actions/serviceActions'
// import inquiry from '../../../../backend/models/inquiry';
import { newInquiry } from '../../actions/inquiryActions';
// import { UPDATE_SERVICES_RESET } from '../../constants/serviceConstants'
import { NEW_INQUIRY_RESET } from '../../constants/inquiryConstants'
import $ from 'jquery';

const SingleService = () => {

    const [instruction, setInstruction] = useState('')
    const [service_id, setService_id] = useState('')
    const [customer, setCustomer] = useState('')
    const [freelancer,setFreelancer] = useState('')
    const [attachments,setAttachments] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // const { error, isUpdated } = useSelector(state => state.updelService);
    const { service, loading } = useSelector(state => state.serviceDetails)
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const { inquiry, error, success} = useSelector(state => state.inquiry)
    // const { loading, error, services } = useSelector(state => state.services);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getServiceDetails(id))
        // if (service && service._id !== id) {
           
        // } 
        setInstruction(instruction);
        setService_id(id);
        setCustomer(user && user._id);
        
          
        
       
setAttachments("trial");

       
      
       
   
            
       
       
        
// console.log(service.user._id)
      
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/');
            alert.success('Inquiry created successfully');
            dispatch({ type: NEW_INQUIRY_RESET })
        }

  

    }, [dispatch, alert, navigate,error,success])

   
    const submitHandler = (e) => {
        e.preventDefault();
        setFreelancer(service.user && service.user._id)
        console.log(service.user && service.user._id) 
        const formData = new FormData();
        formData.set('instruction', instruction);
        formData.set('service_id', service_id);
        formData.set('customer', customer);
        formData.set('freelancer', service.freelancer_id);
        formData.set('attachments',attachments);

        // console.log(service.user._id);
 
        dispatch(newInquiry( formData))
        
       $('.modal-backdrop').hide();
        $('body').removeClass('modal-open');
        // $('#exampleModalCenter').modal('hide');
        // $('#<%=hfImg.ClientID%>').val("");
    }
  
  

    return (
        <Fragment>


        {loading ? <Loader /> : (
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
<button className="custom-btn btn-5" style={{margin:'20px'}} data-toggle="modal" data-target="#exampleModalCenter" ><span style={{margin:'10px'}} >Inquire</span></button>
<button className="custom-btn btn-5" style={{margin:'20px'}}><span>Read More</span></button>
<label>{service.user && service.user.name}</label>
</div>
</center>

</div>
<div className='2nd' style={{backgroundColor:"red", width: "70%"}}></div>

         </div>


         <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Inquire</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="email_field">Instruction</label>
                                            <textarea
                type="text"
                placeholder="Instruction for the freelancer"
                className="form-control"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
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
    </Fragment >
        
    )
}

export default SingleService