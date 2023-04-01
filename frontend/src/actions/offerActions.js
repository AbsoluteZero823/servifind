import axios from 'axios';

import {

    NEW_OFFER_REQUEST,
    NEW_OFFER_SUCCESS,
    NEW_OFFER_FAIL,

    SINGLE_OFFER_REQUEST,
    SINGLE_OFFER_SUCCESS,
    SINGLE_OFFER_FAIL,


    GET_OFFERS_REQUEST,
    GET_OFFERS_SUCCESS,
    GET_OFFERS_FAIL,

    REQUEST_OFFERS_REQUEST,
    REQUEST_OFFERS_SUCCESS,
    REQUEST_OFFERS_FAIL,

    CLEAR_ERRORS
} from '../constants/offerConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newOffer = (offerData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/offer/new', offerData, config)

        dispatch({
            type: NEW_OFFER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getOffers = () => async (dispatch) => {
    try {

        dispatch({ type: GET_OFFERS_REQUEST })




        const { data } = await axios.get(`/api/v1/offers`)


        dispatch({
            type: GET_OFFERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_OFFERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleOffer = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_OFFER_REQUEST })
        const { data } = await axios.get(`/api/v1/offer/${id}`)
        dispatch({
            type: SINGLE_OFFER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const RequestOffer = (request_id) => async (dispatch) => {
    try {


        dispatch({ type: REQUEST_OFFERS_REQUEST })
        const { data } = await axios.get(`/api/v1/offers-request/${request_id}`)
        dispatch({
            type: REQUEST_OFFERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REQUEST_OFFERS_FAIL,
            payload: error.response.data.message
        })
    }
}

