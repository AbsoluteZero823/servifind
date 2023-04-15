import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData'

import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../../layout/Loader'

import BasicInfo from "./BasicInfo";

import ServiceInfo from "./ServiceInfo";
import VerificationProof from './VerificationProof';


import { newFreelancer, clearErrors } from '../../../actions/freelancerActions'
import { newService } from '../../../actions/serviceActions';

// import { NEW_SERVICES_RESET } from '../../constants/serviceConstants'

const Application = () => {

    const dispatch = useDispatch()
    const alert = useAlert();
    let navigate = useNavigate();

    const [page, setPage] = useState(0);
    // const { error } = useSelector(state => state.addService);
    const { error, success } = useSelector(state => state.addFreelancer);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const [freelancerData, setFreelancerData] = useState({


        // user_id: user && user._id,
        resume: "",
        schoolID: ""

    });

    const [serviceData, setServiceData] = useState({
        category: "",
        name: "",
        priceStarts_At: "",
        user: "",
        freelancer_id: ""


    });
    const FormTitles = ["Personal Info", "Your First Service", "Verification & Proof"];
    const { loading } = useSelector(state => state.auth)
    const PageDisplay = () => {
        if (page === 0) {
            return <BasicInfo />;
        } else if (page === 1) {
            return <ServiceInfo serviceData={serviceData} setServiceData={setServiceData} />;
        } else {
            return <VerificationProof freelancerData={freelancerData} setFreelancerData={setFreelancerData} />;
        }
    };
    // const [user, setUser] = useState({
    //     name: '',
    //     age: '',
    //     gender: '',
    //     contact: '',
    //     email: '',
    //     password: '',
    // })

    // const { name, age, gender, contact, email, password } = user;

    // const [avatar, setAvatar] = useState('')
    // const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    // const alert = useAlert();
    // const dispatch = useDispatch();
    // let navigate = useNavigate();

    // const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    // useEffect(() => {



    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    // }, [dispatch, alert, isAuthenticated, error, navigate])

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            // navigate('/services');
            alert.success('Application sent successfully');
            // dispatch({ type: NEW_SERVICES_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(freelancerData);
        console.log(serviceData);

        dispatch(newFreelancer(freelancerData));
        // alert.success('Registered successfully.')
    }

    // const onChange = e => {
    //     if (e.target.name === 'avatar') {

    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result)
    //                 setAvatar(reader.result)
    //             }
    //         }

    //         reader.readAsDataURL(e.target.files[0])

    //     } else {
    //         setUser({ ...user, [e.target.name]: e.target.value })
    //     }
    // }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Freelance Application'} />





                    <form className="form" onSubmit={submitHandler} encType='multipart/form-data'>
                        <div className="progressbar">
                            <div
                                style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
                            ></div>
                        </div>
                        <div className="form-container">
                            <div className="fheader">
                                <h1>{FormTitles[page]}</h1>
                            </div>
                            <div className="fbody">{PageDisplay()}</div>
                            <div className="ffooter">
                                <button
                                    disabled={page === 0}
                                    onClick={() => {
                                        setPage((currPage) => currPage - 1);
                                    }}
                                >
                                    Prev
                                </button>
                                <button
                                    type={(page === FormTitles.length - 1) ? 'submit' : ''}
                                    onClick={() => {
                                        if (page === FormTitles.length - 1) {
                                            // alert.success("FORM SUBMITTED");

                                            console.log(freelancerData);
                                        } else {
                                            setPage((currPage) => currPage + 1);
                                        }
                                    }}
                                >
                                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                                </button>
                            </div>
                        </div>
                    </form>




                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Application
