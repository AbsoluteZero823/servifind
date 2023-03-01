import {
    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_RESET,
    NEW_TRANSACTION_FAIL,


    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    // MY_FTRANSACTION_REQUEST,
    // MY_FTRANSACTION_SUCCESS,
    // MY_FTRANSACTION_FAIL,

    // MY_CTRANSACTION_REQUEST,
    // MY_CTRANSACTION_SUCCESS,
    // MY_CTRANSACTION_FAIL,

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


export const getTransactionsReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {


        case GET_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.transactions,
            }

        case GET_TRANSACTIONS_FAIL:
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