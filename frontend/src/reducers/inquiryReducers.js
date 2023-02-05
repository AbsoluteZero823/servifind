
import {
    NEW_INQUIRY_REQUEST,
    NEW_INQUIRY_SUCCESS,
    NEW_INQUIRY_RESET,
    NEW_INQUIRY_FAIL,

    CLEAR_ERRORS
} from '../constants/inquiryConstants'


export const newInquiryReducer = (state = { inquiry: {} }, action) => {
    switch (action.type) {

        case NEW_INQUIRY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_INQUIRY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                inquiry: action.payload.inquiry
            }

        case NEW_INQUIRY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_INQUIRY_RESET:
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
