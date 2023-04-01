import {

    NEW_OFFER_REQUEST,
    NEW_OFFER_SUCCESS,
    NEW_OFFER_RESET,
    NEW_OFFER_FAIL,


    GET_OFFERS_REQUEST,
    GET_OFFERS_SUCCESS,
    GET_OFFERS_FAIL,

    SINGLE_OFFER_REQUEST,
    SINGLE_OFFER_SUCCESS,
    SINGLE_OFFER_FAIL,

    REQUEST_OFFERS_REQUEST,
    REQUEST_OFFERS_SUCCESS,
    REQUEST_OFFERS_FAIL,

    CLEAR_ERRORS
} from '../constants/offerConstants'


export const newOfferReducer = (state = { offer: {} }, action) => {
    switch (action.type) {

        case NEW_OFFER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_OFFER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                offer: action.payload.offer
            }

        case NEW_OFFER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_OFFER_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const getOffersReducer = (state = { offers: [] }, action) => {
    switch (action.type) {


        case GET_OFFERS_REQUEST:
        case REQUEST_OFFERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_OFFERS_SUCCESS:
        case REQUEST_OFFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                offers: action.payload.offers,
            }

        case GET_OFFERS_FAIL:
        case REQUEST_OFFERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const getRequestOffersReducer = (state = { requestoffers: [] }, action) => {
    switch (action.type) {



        case REQUEST_OFFERS_REQUEST:
            return {
                ...state,
                loading: true,
            }


        case REQUEST_OFFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                requestoffers: action.payload.requestoffers,
            }


        case REQUEST_OFFERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const offerDetailsReducer = (state = { offer: {} }, action) => {
    switch (action.type) {

        case SINGLE_OFFER_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case SINGLE_OFFER_SUCCESS:
            return {
                ...state,
                loadings: false,
                offer: action.payload.offer,
            }

        case SINGLE_OFFER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

