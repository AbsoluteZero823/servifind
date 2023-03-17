import React from "react";

function PricingInfo({ formData, setFormData }) {
    return (
        <div className="pricing-info-container">
            {/* <label>Price Starts</label>
            <input
                type="text"
                placeholder="Price Starts At"
                className="form-control"
                value={formData.start}
                onChange={(e) => {
                    setFormData({ ...formData, start: e.target.value });
                }}
            />
            <label>Price Ends</label>
            <input
                type="text"
                placeholder="Time Interval"
                className="form-control"
                value={formData.end}
                onChange={(e) => {
                    setFormData({ ...formData, end: e.target.value });
                }}
            /> */}
            {/* <label htmlFor="email_field">Experiences</label>
            <textarea
                type="text"
                placeholder="Detailed Experience"
                className="form-control"
                value={formData.experience}
                onChange={(e) => {
                    setFormData({ ...formData, experience: e.target.value });
                }}
            /> */}




            <div className='form-group'>
                <br />
                <label htmlFor="email_field">Resumé</label>
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
                        // onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            resumé must be image
                        </label>
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
                        // onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Attach School ID
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingInfo;