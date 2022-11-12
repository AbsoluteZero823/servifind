
import {
    ALL_ANIMALS_REQUEST,
    ALL_ANIMALS_SUCCESS,
    ALL_ANIMALS_FAIL,

    FULL_ANIMALS_REQUEST,
    FULL_ANIMALS_SUCCESS,
    FULL_ANIMALS_FAIL,

    NEW_ANIMALS_REQUEST,
    NEW_ANIMALS_SUCCESS,
    NEW_ANIMALS_RESET,
    NEW_ANIMALS_FAIL,

    UPDATE_ANIMALS_REQUEST,
    UPDATE_ANIMALS_SUCCESS,
    UPDATE_ANIMALS_RESET,
    UPDATE_ANIMALS_FAIL,

    DELETE_ANIMALS_REQUEST,
    DELETE_ANIMALS_SUCCESS,
    DELETE_ANIMALS_RESET,
    DELETE_ANIMALS_FAIL,

    ANIMAL_DETAILS_REQUEST,
    ANIMAL_DETAILS_SUCCESS,
    ANIMAL_DETAILS_FAIL,

    SINGLE_DETAILS_REQUEST,
    SINGLE_DETAILS_SUCCESS,
    SINGLE_DETAILS_FAIL,

    ADOPT_ANIMALS_REQUEST,
    ADOPT_ANIMALS_SUCCESS,
    ADOPT_ANIMALS_FAIL,
    ADOPT_ANIMALS_RESET,

    GET_ADOPT_REQUEST,
    GET_ADOPT_SUCCESS,
    GET_ADOPT_FAIL,


    CLEAR_ERRORS
} from '../constants/animalConstants'

export const animalsReducer = (state = { animals: [] }, action) => {
    switch (action.type) {
        case ALL_ANIMALS_REQUEST:
            return {
                loading: true,
                animals: []
            }
        case ALL_ANIMALS_SUCCESS:
            return {
                loading: false,
                animals: action.payload.animals,
                animalsCount: action.payload.animalsCount,
                resPerPage: action.payload.resPerPage,
                filteredAnimalsCount: action.payload.filteredAnimalsCount
            }
        case ALL_ANIMALS_FAIL:
            return {
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
export const allAnimalsReducer = (state = { animals: [] }, action) => {
    switch (action.type) {

        case FULL_ANIMALS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case FULL_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.payload.animals,
            }

        case FULL_ANIMALS_FAIL:
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

export const getAdoptReducer = (state = { animals: [] }, action) => {
    switch (action.type) {

        case GET_ADOPT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_ADOPT_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.payload.animals,
            }

        case GET_ADOPT_FAIL:
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


export const animalDetailsReducer = (state = { animal: {} }, action) => {
    switch (action.type) {
        case ANIMAL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ANIMAL_DETAILS_SUCCESS:
            return {
                loading: false,
                animal: action.payload
            }
        case ANIMAL_DETAILS_FAIL:
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

export const singleAnimalReducer = (state = { animal: {} }, action) => {
    switch (action.type) {
        case SINGLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SINGLE_DETAILS_SUCCESS:
            return {
                loading: false,
                animal: action.payload
            }
        case SINGLE_DETAILS_FAIL:
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


export const newAnimalReducer = (state = { animal: {} }, action) => {
    switch (action.type) {

        case NEW_ANIMALS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANIMALS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                animal: action.payload.animal
            }

        case NEW_ANIMALS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ANIMALS_RESET:
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


export const UpDelAnimalReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ANIMALS_REQUEST:
        case UPDATE_ANIMALS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_ANIMALS_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ANIMALS_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_ANIMALS_FAIL:
        case UPDATE_ANIMALS_FAIL:
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

export const adoptReducer = (state = {}, action) => {
    switch (action.type) {

        case ADOPT_ANIMALS_REQUEST:



            return {
                ...state,
                loading: true
            }
        case ADOPT_ANIMALS_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        // case DELETE_USER_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isDeleted: action.payload
        //     }
        case ADOPT_ANIMALS_RESET:

            return {
                ...state,
                isUpdated: false
            }

        // case DELETE_USER_RESET:
        //     return {
        //         ...state,
        //         isDeleted: false
        //     }
        case ADOPT_ANIMALS_FAIL:

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
