import axios from 'axios';

import {
   
    NEW_INQUIRY_REQUEST,
    NEW_INQUIRY_SUCCESS,
    NEW_INQUIRY_FAIL,



    CLEAR_ERRORS
} from '../constants/inquiryConstants';




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newService = (inquiryData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INQUIRY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/inquiry/new', inquiryData, config)

        dispatch({
            type: NEW_INQUIRY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}


