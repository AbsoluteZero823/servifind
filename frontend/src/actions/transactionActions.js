import axios from 'axios';

import {
   
    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_FAIL,

   

    CLEAR_ERRORS
} from '../constants/transactionConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newTransaction = (transactionData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TRANSACTION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/transaction/new', transactionData, config)

        dispatch({
            type: NEW_TRANSACTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}
