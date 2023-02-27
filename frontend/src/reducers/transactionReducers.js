import {
    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_RESET,
    NEW_TRANSACTION_FAIL,

    MY_FTRANSACTION_REQUEST,
    MY_FTRANSACTION_SUCCESS,
    MY_FTRANSACTION_FAIL,

    MY_CTRANSACTION_REQUEST,
    MY_CTRANSACTION_SUCCESS,
    MY_CTRANSACTION_FAIL,
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


export const transactionsReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {


        case MY_FTRANSACTION_REQUEST:
        case MY_CTRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case MY_FTRANSACTION_SUCCESS:
        case MY_CTRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.transactions,
            }

        case MY_FTRANSACTION_FAIL:
        case MY_CTRANSACTION_FAIL:
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