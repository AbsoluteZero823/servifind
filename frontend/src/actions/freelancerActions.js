import axios from 'axios';

import {
  

    SINGLE_FREELANCER_REQUEST,
    SINGLE_FREELANCER_SUCCESS,
    SINGLE_FREELANCER_FAIL,

 
    CLEAR_ERRORS
} from '../constants/freelancerConstants';




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



export const SingleFreelancer = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_FREELANCER_REQUEST })
        const { data } = await axios.get(`/api/v1/freelancer/details/${id}`)
        dispatch({
            type: SINGLE_FREELANCER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_FREELANCER_FAIL,
            payload: error.response.data.message
        })
    }
}