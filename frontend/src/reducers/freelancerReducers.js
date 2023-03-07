
import {


    SINGLE_FREELANCER_REQUEST,
    SINGLE_FREELANCER_SUCCESS,
    SINGLE_FREELANCER_FAIL,

    CLEAR_ERRORS
} from '../constants/freelancerConstants'


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


