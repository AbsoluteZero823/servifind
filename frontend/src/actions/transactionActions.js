import axios from 'axios';

import {

    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_FAIL,

    MY_FTRANSACTION_REQUEST,
    MY_FTRANSACTION_SUCCESS,
    MY_FTRANSACTION_FAIL,

    MY_CTRANSACTION_REQUEST,
    MY_CTRANSACTION_SUCCESS,
    MY_CTRANSACTION_FAIL,


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



export const getMyCTransactions = () => async (dispatch) => {
    try {

        dispatch({ type: MY_CTRANSACTION_REQUEST })

        const { data } = await axios.get(`/api/v1/my/transactionsc`)

        dispatch({
            type: MY_CTRANSACTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_CTRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyFTransactions = () => async (dispatch) => {
    try {

        dispatch({ type: MY_FTRANSACTION_REQUEST })

        const { data } = await axios.get(`/api/v1/my/transactionsf`)

        dispatch({
            type: MY_FTRANSACTION_SUCCESS,

            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_FTRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}