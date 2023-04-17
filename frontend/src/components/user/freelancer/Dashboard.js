import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Swal from 'sweetalert2';
import $ from 'jquery';

const Dashboard = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const [activeSlider, setActiveSlider] = useState(1);


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







            // console.log(ClientTransactions)
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


                    setActiveSlider(0);
                    console.log(activeSlider);
                    $("#myCheck").prop("checked", true);
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
    return (
        <div className='containerDashboard'>
            <button>Setup Information</button>

            {user.role === 'freelancer' && (
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
        </div>
    )
}

export default Dashboard