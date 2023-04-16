import React, { Fragment, useState, useEffect } from 'react'

function VerificationProof({ freelancerData, setFreelancerData }) {

    const [resumeName, setResumeName] = useState('')
    // const [resume, setResume] = useState('')

    const [schoolIDName, setSchoolIDName] = useState('')
    // const [schoolID, setSchoolID] = useState('')

    //     onChange = {(e) => {
    //         setFormData({ ...formData, firstName: e.target.value });
    //     }
    // }

    const resumeOnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setFreelancerData({ ...freelancerData, resume: reader.result })

                setResumeName(e.target.files[0].name)
                // console.log(avatarName)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const schoolIDOnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setFreelancerData({ ...freelancerData, schoolID: reader.result })
                setSchoolIDName(e.target.files[0].name)

            }
        }
        console.log(freelancerData.schoolID)
        reader.readAsDataURL(e.target.files[0])

    }
    return (
        <div className="verification-proof-container">

            <div className='form-group'>
                <label htmlFor="service_id">Course:</label>

                <select
                    name="service_id"
                    id="service_id"
                    className='form-control'
                // value={service_id}
                // onChange={(e) => setServiceId(e.target.value)}
                >
                    <option value="">Select Course</option>


                    <option value="Course 1">Course 1</option>
                    <option value="Course 1">Course 2</option>
                    <option value="Course 1">Course 3</option>
                </select>
                <br />
                <label htmlFor="email_field">Resumé</label>
                <div className='d-flex align-items-center'>

                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept='image/*'
                            onChange={resumeOnChange}
                        />

                        {resumeName ? (
                            <label className='custom-file-label' htmlFor='customFile'>

                                {resumeName}

                            </label>

                        ) : (
                            <label className='custom-file-label' htmlFor='customFile'>

                                resumé must be image

                            </label>

                        )
                        }

                    </div>
                </div>
            </div>
            <div className='form-group'>
                <br />
                <label htmlFor="email_field">School ID</label>
                <div className='d-flex align-items-center'>
                    {/* <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                // src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar Preview'
                            />
                        </figure>
                    </div> */}
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept='image/*'
                            onChange={schoolIDOnChange}
                        />

                        {schoolIDName ? (
                            <label className='custom-file-label' htmlFor='customFile'>

                                {schoolIDName}

                            </label>

                        ) : (
                            <label className='custom-file-label' htmlFor='customFile'>

                                Attach School ID

                            </label>

                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerificationProof;