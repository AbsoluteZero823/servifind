import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import { allAnimals, deleteAnimal, clearErrors } from '../../actions/animalActions'
import { getAdopt } from '../../actions/animalActions'
// import { DELETE_ANIMALS_RESET } from '../../constants/animalConstants'

const Adopted = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useState({

    })
    // let { id } = useParams();

    const { loading, error, animals } = useSelector(state => state.getAdopt);
    // const { user } = useSelector(state => state.auth)
    // const { isDeleted } = useSelector(state => state.updelAnimal)

    // const userid = new FormData();
    // userid.set('userid', user._id);
    // userid.set('username', user.name);

    useEffect(() => {
        dispatch(getAdopt())

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Animal deleted successfully');
        //     navigate('/animals');
        //     dispatch({ type: DELETE_ANIMALS_RESET })
        // }

    }, [dispatch, alert, error, navigate])
    // isDeleted

    // const deleteUserHandler = (id) => {
    //     dispatch(deleteAnimal(id))
    // }

    // const adoptHandler = (id, userid) => {
    //     dispatch(adopt(id, userid))
    // }
    // const userData = new FormData();
    // userData.set('userid', user.id);
    // userData.set('username', user.name);
    // console.log(userData);



    const setAnimals = () => {
        const data = {
            columns: [

                {
                    label: 'Image',
                    field: 'images'

                },

                {
                    label: 'Animal ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc'
                },
                {
                    label: 'Gender',
                    field: 'gender',
                    sort: 'asc'
                },
                {
                    label: 'Breed',
                    field: 'breed',
                    sort: 'asc'
                },
                {
                    label: 'Type',
                    field: 'type',
                },
                // {
                //     label: 'Status',
                //     field: 'status',
                // },
                // {
                //     label: 'Actions',
                //     field: 'actions',
                // },
            ],
            rows: []
        }

        animals.forEach(animal => {
            data.rows.push({
                images: <Fragment>

                    <img
                        className="anim"
                        src={animal.images.url}
                    />

                </Fragment>,
                id: animal._id,
                name: animal.name,
                age: animal.age,
                gender: animal.gender,
                breed: animal.breed,
                type: animal.type,
                // status: animal.status,

                // actions: <Fragment>
                //     {/* <Link to={`/animal/${animal._id}`} className="btn btn-primary py-1 px-2">
                //         <i className="fa fa-pencil"></i>
                //     </Link> */}
                //     <button className="btn btn-danger py-1 px-2 ml-2" >
                //         <i className="fa fa-trash"></i>
                //     </button>
                //     {/* onClick={() => deleteUserHandler(animal._id)} */}

                // </Fragment>
            })
        })

        return data;
    }
    // console.log(user._id)

    return (
        <Fragment>
            <MetaData title={'All Animals'} />

            <div className="row">
                <div className="col-12 col-md-1">
                    {/*<Sidebar />*/}
                </div>

                <div className="Details col-12 col-md-9">
                    <Fragment>
                        <h1 className="my-5">My Adopted Animals

                        </h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAnimals()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default Adopted