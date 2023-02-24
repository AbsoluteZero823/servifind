import {
    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_RESET,
    NEW_TRANSACTION_FAIL,

    CLEAR_ERRORS
} from '../constants/transactionConstants'


export const newTransactionReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {

        case NEW_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TRANSACTION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                transaction: action.payload.transaction
            }

        case NEW_TRANSACTION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_TRANSACTION_RESET:
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