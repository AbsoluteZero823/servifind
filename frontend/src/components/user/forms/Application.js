import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../../actions/userActions'
import Loader from '../../layout/Loader'

import BasicInfo from "./BasicInfo";
import PricingInfo from "./PricingInfo";
import ServiceInfo from "./ServiceInfo";

const Application = () => {

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        experience: "",
        start: "",
        end: "",
        // username: "",
        // nationality: "",
        // other: "",
    });

    const FormTitles = ["Personal Info", "Your First Service", "Verification & Proof"];
    const { loading } = useSelector(state => state.auth)
    const PageDisplay = () => {
        if (page === 0) {
            return <BasicInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <ServiceInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <PricingInfo formData={formData} setFormData={setFormData} />;
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

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.set('name', name);
    //     formData.set('age', age);
    //     formData.set('gender', gender);
    //     formData.set('contact', contact);
    //     formData.set('email', email);
    //     formData.set('password', password);
    //     formData.set('avatar', avatar);

    //     dispatch(register(formData))
    //     alert.success('Registered successfully.')
    // }

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





                    <div className="form">
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
                                    onClick={() => {
                                        if (page === FormTitles.length - 1) {
                                            alert("FORM SUBMITTED");
                                            console.log(formData);
                                        } else {
                                            setPage((currPage) => currPage + 1);
                                        }
                                    }}
                                >
                                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                                </button>
                            </div>
                        </div>
                    </div>




                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Application
