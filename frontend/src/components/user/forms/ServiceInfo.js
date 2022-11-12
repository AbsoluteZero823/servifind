import React from "react";

function ServiceInfo({ formData, setFormData }) {
    return (
        <div className="service-info-container">
            {/* <input
                type="text"
                placeholder="Category"
                className="form-control"
                value={formData.firstName}
                onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                }}



            /> */}
            <label htmlFor="email_field">Service Category</label>
            <select
                type="text"
                id="gender_field"
                className="form-control"
                name='gender'
                value={formData.category}
                onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                }}>
                <option value="" disabled hidden>Select Category</option>
                <option value="GD">Graphics & Design</option>
                <option value="DM">Digital Marketing</option>
                <option value="WT">Writing & Translation</option>
                <option value="VA">Video & Animation</option>
                <option value="MA">Music & Audio</option>
                <option value="PT">Programming & Tech</option>
                <option value="Data">Data</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <label htmlFor="email_field">Service Description</label>
            <input
                type="text"
                placeholder="I will ...... for you"
                className="form-control"
                value={formData.description}
                onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                }}
            />

            <br />
            <label>Price Starts</label>
            <input
                type="text"
                placeholder="Price Starts At"
                className="form-control"
                value={formData.start}
                onChange={(e) => {
                    setFormData({ ...formData, start: e.target.value });
                }}
            />
            <label>Time Interval</label>
            <input
                type="text"
                placeholder="Expected Accomplishment time interval in days"
                className="form-control"
                value={formData.end}
                onChange={(e) => {
                    setFormData({ ...formData, end: e.target.value });
                }}
            />
            {/* a */}





        </div>

    );
}

export default ServiceInfo;