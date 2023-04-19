import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Swal from 'sweetalert2';
import $ from 'jquery';

import Loader from '../../layout/Loader';

import { availabilityUpdate,completeFreelancerSetup } from '../../../actions/freelancerActions';

import { AVAILABILITY_UPDATE_RESET, FREELANCER_SETUP_RESET } from '../../../constants/freelancerConstants';

const Dashboard = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { isUpdated} = useSelector(state => state.updateFreelancer)

    const dispatch = useDispatch()

    const [activeSlider, setActiveSlider] = useState(0);
    const [gcash_name, setGcashName] = useState('');
    const [gcash_num, setGcashNum] = useState('');
    const [qrCodeName, setQRCodeName] = useState('')
    const [qrCode, setQRCode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
     if(user.freelancer_id.availability === 'true'){
        console.log('available')
        $("#myCheck").prop("checked", true);
        setActiveSlider(0)
     }
     else {
        console.log('else')
        $("#myCheck").prop("checked", false);
        setActiveSlider(1)
     }
    
      }, [])

      useEffect(() => {
if (isUpdated){
   
    Swal.fire(
        'Success',
        'Update Successfully',
        'success'
    )
    $('.modal-backdrop').hide();
    $("#setupModal").hide();
    dispatch({type: AVAILABILITY_UPDATE_RESET})
    dispatch({type: FREELANCER_SETUP_RESET})
    setLoading(false)
}
       
         }, [isUpdated])


         const OnChange = e => {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
    
                   setQRCode(reader.result)
    
                    setQRCodeName(e.target.files[0].name)
                    // console.log(avatarName)
                }
            }
    
            reader.readAsDataURL(e.target.files[0])
    
        }

        const submitHandler = (e) => {
            e.preventDefault();
    
            const freelancerData = new FormData();
            freelancerData.set('gcash_name', gcash_name);
            freelancerData.set('gcash_num', gcash_num);
            freelancerData.set('qrCode', qrCode);
      
    dispatch(completeFreelancerSetup(freelancerData))
    setLoading(true);
        //     dispatch(updateUser(user._id, formData))
        }
    const clickedSliderHandler = (e) => {
        // console.log(e.target);
        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked === false) {

            Swal.fire({
                title: 'Are you Sure?',
                text: "Accepting this Application will make this student acquire a freelancer role.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Approve'
            }).then((result) => {
                if (result.isConfirmed) {
                    // dispatch(approveApplication(id))
                    setActiveSlider(1);
                    console.log(activeSlider);
                    $("#myCheck").prop("checked", false);
dispatch(availabilityUpdate());
                    Swal.fire(
                        'Success',
                        'Status set to "not available"',
                        'success'
                    )
                    //closes the modal
                    // $('.close').click();

                } else {
                    $("#myCheck").prop("checked", true);
                }
            })


        } else {

            Swal.fire({
                title: 'Are you Sure?',
                text: "Accepting this Application will make this student acquire a freelancer role.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Approve'
            }).then((result) => {
                if (result.isConfirmed) {
                    const freelancerData = new FormData();

                    setActiveSlider(0);
                    console.log(activeSlider);
                    $("#myCheck").prop("checked", true);
                    dispatch(availabilityUpdate());
                    Swal.fire(
                        'Success',
                        'Status set to "available"',
                        'success'
                    )
                    //closes the modal


                } else {
                    $("#myCheck").prop("checked", false);
                }
            })


            // console.log(FreelancerTransactions)
        }

        
        // const { value } = e.target;
        // setActiveSlider(1);
        // console.log(activeButton);
    };


    const notSetupSliderHandler = (e) => {
        // console.log(e.target);
        // var checkBox = document.getElementById("myCheck");
        Swal.fire(
            'Warning',
            'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
            'info'
        )

            // Swal.fire({
            //     title: 'Warning?',
            //     text: 'Please Complete your payment details first. Click "Complete Setup" button to setup your Payment Details',
            //     icon: 'info',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Approve'
            // })


       

        
        // const { value } = e.target;
        // setActiveSlider(1);
        // console.log(activeButton);
    };
    return (
        <Fragment>
         {loading ? <Loader /> : (
        <Fragment>
              
                
              
        <div className='containerDashboard'>
            <button data-toggle="modal" data-target="#setupModal">Complete Setup</button>

            {user.role === 'freelancer' && user.freelancer_id.gcash_num && (
                <a name='' className={activeSlider === 1 ? `selection` : "selection active"} style={{ borderLeft: '3px solid' }} >Availability
                    <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                        <input type="checkbox" id='myCheck' onClick={clickedSliderHandler} />
                        <span className="slider round" ></span>
                    </label>
                    {/* <div className='inTransDiv'>
                                        <button className='buttonInTransCircle' style={{backgroundColor:'transparent',  color:'gray'}}> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="bottom" title='Turn on the switch to display Freelancer transactions'></i></button>
                                    </div> */}
                </a>
            )}

{user.role === 'freelancer' && !user.freelancer_id.gcash_num && (
                <a name='' className='selection'  >Availability
                    <label className="switch" style={{ justifyContent: 'center', margin: '0px 5px' }}>
                        <div  onClick={notSetupSliderHandler}>
                        <input type="checkbox" id='myCheck' onClick={notSetupSliderHandler} /></div>
                        <span className="slider round" ></span>
                    </label>
                    {/* <div className='inTransDiv'>
                                        <button className='buttonInTransCircle' style={{backgroundColor:'transparent',  color:'gray'}}> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="bottom" title='Turn on the switch to display Freelancer transactions'></i></button>
                                    </div> */}
                </a>
            )}
        </div>

        {/* SETUP INFORMATION MODAL */}


        <div className="modal fade" id="setupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Payment Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form className="a" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label htmlFor="email_field">GCash Name</label>
                                            <input
                                                type="text"
                                                id="gcash_name"
                                                className="form-control"
                                                name='gcash_name'
                                                placeholder='Your gcash name'
                                                required
                                                value={gcash_name}
                                                onChange={(e) => setGcashName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_field">GCash Number</label>
                                            <input
                                                type="number"
                                                id="gcash_num"
                                                className="form-control"
                                                name='gcash_num'
                                                placeholder='Your Gcash registered number'
                                                required
                                                value={gcash_num}
                                                onChange={(e) => setGcashNum(e.target.value)}
                                            />
                                        </div>
                                      

                                        <label htmlFor="email_field">GCash QRCode</label>
    <div className='d-flex align-items-center'>

        <div className='custom-file'>
            <input
                type='file'
                name='qrCode'
                className='custom-file-input'
                id='customFile'
                accept='image/*'
                onChange={OnChange}
            />

            {qrCodeName ? (
                <label className='custom-file-label' htmlFor='customFile'>

                    {qrCodeName}

                </label>

            ) : (
                <label className='custom-file-label' htmlFor='customFile'>

                    attach GCash QRCode

                </label>

             )
            } 

        </div>
    </div>


                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
               
        {/* //////////////////// */}
            
        </Fragment>
        )}</Fragment>
    )
}

export default Dashboard