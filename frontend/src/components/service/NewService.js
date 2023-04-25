import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newService, clearErrors } from '../../actions/serviceActions'
import { NEW_SERVICES_RESET } from '../../constants/serviceConstants'

const NewService = () => {
    const [name, setName] = useState('')
    const { user } = useSelector(state => state.auth)


    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();





    const { loading, error, success } = useSelector(state => state.addService);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/services');
            alert.success('Service created successfully');
            dispatch({ type: NEW_SERVICES_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);


        dispatch(newService(formData))
    }



    return (
        <Fragment>

            <MetaData title={'Create Service'} />




            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Create Service</h1>



                        <div className="form-group">
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


                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Age</label>
                                            <input
                                                type="age"
                                                id="age_field"
                                                className="form-control"
                                                name='age'
                                                value={age}
                                                onChange={onChange}
                                            />
                                        </div> */}



                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Gender</label>
                                            <select 
                                                type="gender" 
                                                id="gender_field" 
                                                className="form-control" 
                                                name='gender' 
                                                value={gender} 
                                                onChange={onChange} placeholder="Select Gender">
                                                <option value="" disabled hidden>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div> */}



                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Breed</label>
                                            <input
                                                type="breed"
                                                id="breed_field"
                                                className="form-control"
                                                name='breed'
                                                value={breed}
                                                onChange={onChange}
                                            />
                                        </div> */}



                        {/* <div className="form-group">
                                            <label htmlFor="email_field">Type</label>
                                            <select id="type_field" 
                                                className="form-control" 
                                                name='type' 
                                                value={type} 
                                                onChange={onChange} >

                                                <option value="" disabled hidden>Select Type</option>
                                                <option value="Cat">Cat</option>
                                                <option value="Dog">Dog</option>
                                            </select>
                                        </div> */}












                        {/* <div className='form-group'>
                            <label htmlFor='images_upload'>Image</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={imagePreview}
                                            className='rounded-circle'
                                            alt='Image Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='images'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Upload Image
                                    </label>
                                </div>
                            </div>
                        </div> */}










                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                        <Link to={`/services/${user.freelancer_id._id}`} className="btn btn-danger btn-block py-3">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>



        </Fragment>
    )
}

export default NewService