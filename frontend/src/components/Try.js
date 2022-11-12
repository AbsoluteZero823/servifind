
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
import Service from './service/Service'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getServices } from '../actions/serviceActions'
import { allUsers } from '../actions/userActions'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const Try = () => {

    // const { createSliderWithToolTip } = Slider;
    // const Range = createSliderWithToolTip(Slider.Range);


    const alert = useAlert();
    const dispatch = useDispatch();


    const { users } = useSelector(state => state.users)
    const { loading, services, error, servicesCount, resPerPage, filteredServicesCount } = useSelector(state => state.services);


    const [currentPage, setCurrentPage] = useState(1)
    let { keyword } = useParams();

    useEffect(() => {
        dispatch(allUsers())

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }


    }, [dispatch, alert])
    useEffect(() => {
        if (error) {
            alert.success('success')
            return alert.error(error)
        }

        dispatch(getServices(currentPage, keyword))


    }, [dispatch, alert, error, currentPage, keyword]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = servicesCount;

    if (keyword) {
        count = filteredServicesCount
    }
    return (
        <Fragment>


            {loading ? <Loader /> : (
                <Fragment>
                    <div className='containerz'>
                        <MetaData title={'Buy Best Service Online'} />

                        <h1 id="animals_heading">Latest Services</h1>
                        <section id="animals" className="containerz mt-5">
                            <div className="row">
                                {services && services.map(service => (

                                    <Service key={service._id} service={service} users={users} />
                                ))}
                            </div>
                        </section>
                    </div>
                    {/* <MetaData title={'Buy Best Animals Online'} />
                    <h1 id="animals_heading">Latest Animals</h1>
                    <section id="animals" className="container mt-5">
                        <div className="row">
                            {animals && animals.map(animal => (
                                <Animal key={animal._id} animal={animal} />
                            ))}
                        </div>
                    </section> */}

                    {/* {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )} */}

                </Fragment>
            )
            }
        </Fragment >
    );
}
export default Try
