
import {

    GET_FREELANCERS_REQUEST,
    GET_FREELANCERS_SUCCESS,
    GET_FREELANCERS_FAIL,

    SINGLE_FREELANCER_REQUEST,
    SINGLE_FREELANCER_SUCCESS,
    SINGLE_FREELANCER_FAIL,

    NEW_FREELANCER_REQUEST,
    NEW_FREELANCER_SUCCESS,
    NEW_FREELANCER_FAIL,
    NEW_FREELANCER_RESET,

    CLEAR_ERRORS
} from '../constants/freelancerConstants'



export const freelancersReducer = (state = { freelancers: [] }, action) => {
    switch (action.type) {


        case GET_FREELANCERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_FREELANCERS_SUCCESS:

            return {
                ...state,
                loading: false,
                success: action.payload.success,
                freelancers: action.payload.freelancers,
            }

        case GET_FREELANCERS_FAIL:

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

export const freelancerDetailsReducer = (state = { freelancer: {} }, action) => {
    switch (action.type) {

        case SINGLE_FREELANCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SINGLE_FREELANCER_SUCCESS:
            return {
                ...state,
                loading: false,
                freelancer: action.payload.freelancer,
            }

        case SINGLE_FREELANCER_FAIL:
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


export const newFreelancerReducer = (state = { freelancer: {} }, action) => {
    switch (action.type) {

        case NEW_FREELANCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_FREELANCER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                freelancer: action.payload.freelancer
            }

        case NEW_FREELANCER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_FREELANCER_RESET:
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


