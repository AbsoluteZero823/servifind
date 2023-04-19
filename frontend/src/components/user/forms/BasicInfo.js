import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { updateProfile, loadUser, clearErrors } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants'

import Loader from '../../layout/Loader'
// import MetaData from '../../layout/MetaData'

function BasicInfo({ formData, setFormData }) {

    // const [name, setName] = useState('')
    // const [age, setAge] = useState('')
    // const [gender, setGender] = useState('')
    // const [contact, setContact] = useState('')
    // // const [email, setEmail] = useState('')
    // const [avatar, setAvatar] = useState('')

    // const [avatarName, setAvatarName] = useState('')

    const { user, loading } = useSelector(state => state.auth)
    const { error, isUpdated } = useSelector(state => state.user)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(() => {



        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser());

            navigate('/application', { replace: true })

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, navigate, user, isUpdated])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="basic-info-container">


                        <div className='center'>
                            <figure className='profile-pic mr-3 item-rtl'>
                                <img
                                    src={user.avatar.url}
                                    className='rounded-circle'
                                    id='profile-pic'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>

                        <h5 style={{ color: "red" }} >*Make sure your details is correct</h5>
                        <div className='room'>
                            <div className='contents'>
                                <label htmlFor="email_field">Name: {user.name}</label>
                                <label htmlFor="email_field">Age: {user.age}</label>
                                <label htmlFor="email_field">Gender: {user.gender}</label>
                                <label htmlFor="email_field">Contact Number: {user.contact}</label>
                                {/* <label htmlFor="email_field">Email: {user.email}</label> */}
                            </div>
                        </div>


                        {/* <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_field">Age</label>
                            <input
                                type="age"
                                id="age_field"
                                className="form-control"
                                name='age'
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_field">Gender</label>
                            <select
                                type="gender"
                                id="gender_field"
                                className="form-control"
                                name='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="" disabled hidden>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Contact Number</label>
                            <input
                                type="contact"
                                id="contact_field"
                                className="form-control"
                                name='contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div> */}

                        {/* PICTURE */}
                        {/* <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div> */}
                        {/* PICTURE END  */}

                        {/* <a className='edit-right'>edit <i className="fa fa-pencil-square-o"></i></a> */}
                        <button type="button" className="btn btn-primary" id='edit-right' data-toggle="modal" data-target="#exampleModalCenter">
                            edit <i className="fa fa-pencil-square-o"></i>
                        </button>
                        <br></br>
                    </div>





                </Fragment>
            )
            }
        </Fragment >
    );
}

export default BasicInfo;