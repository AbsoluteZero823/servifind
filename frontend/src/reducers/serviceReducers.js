
import {
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,

    // FULL_SERVICES_REQUEST,
    // FULL_SERVICES_SUCCESS, 
    // FULL_SERVICES_FAIL,

    NEW_SERVICES_REQUEST,
    NEW_SERVICES_SUCCESS,
    NEW_SERVICES_RESET,
    NEW_SERVICES_FAIL,

    UPDATE_SERVICES_REQUEST,
    UPDATE_SERVICES_SUCCESS,
    UPDATE_SERVICES_RESET,
    UPDATE_SERVICES_FAIL,

    DELETE_SERVICES_REQUEST,
    DELETE_SERVICES_SUCCESS,
    DELETE_SERVICES_RESET,
    DELETE_SERVICES_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,

    SINGLE_SERVICE_REQUEST,
    SINGLE_SERVICE_SUCCESS,
    SINGLE_SERVICE_FAIL,

    CLEAR_ERRORS
} from '../constants/serviceConstants'

//   export const diseasesReducer = (state = { diseases:[] }, action) => {
//     switch(action.type) {
//          case ALL_SERVICES_REQUEST:
//              return {
//                 loading: true,
//                 diseases:[]
//             }
//         case ALL_SERVICES_SUCCESS:
//             return {
//                 loading: false,
//                 diseases: action.payload.diseases,
//                 diseasesCount: action.payload.diseasesCount,
//                 resPerPage: action.payload.resPerPage,
//                 filteredDiseasesCount: action.payload.filteredDiseasesCount
//             }
//         case ALL_SERVICES_FAIL:
//             return {
//             loading:false,
//             error: action.payload
//             }
//          case CLEAR_ERRORS:
//             return {
//             ...state,
//             error: null
//             }
//          default:
//             return state;
//             }
//   }
export const servicesReducer = (state = { services: [] }, action) => {
    switch (action.type) {

        case ALL_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload.services,
            }

        case ALL_SERVICES_FAIL:
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


export const serviceDetailsReducer = (state = { service: {} }, action) => {
    switch (action.type) {
        case SERVICE_DETAILS_REQUEST:
        case SINGLE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SERVICE_DETAILS_SUCCESS:
        case SINGLE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                service: action.payload.service,
            }
        case SERVICE_DETAILS_FAIL:
        case SINGLE_SERVICE_FAIL:
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


export const newServiceReducer = (state = { service: {} }, action) => {
    switch (action.type) {

        case NEW_SERVICES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_SERVICES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                disease: action.payload.disease
            }

        case NEW_SERVICES_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_SERVICES_RESET:
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


export const UpDelServiceReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_SERVICES_REQUEST:
        case UPDATE_SERVICES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_SERVICES_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_SERVICES_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_SERVICES_FAIL:
        case UPDATE_SERVICES_FAIL:
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
