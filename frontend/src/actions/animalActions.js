import axios from 'axios';

import {
    ALL_ANIMALS_REQUEST,
    ALL_ANIMALS_SUCCESS,
    ALL_ANIMALS_FAIL,

    FULL_ANIMALS_REQUEST,
    FULL_ANIMALS_SUCCESS,
    FULL_ANIMALS_FAIL,

    ANIMAL_DETAILS_REQUEST,
    ANIMAL_DETAILS_SUCCESS,
    ANIMAL_DETAILS_FAIL,

    SINGLE_DETAILS_REQUEST,
    SINGLE_DETAILS_SUCCESS,
    SINGLE_DETAILS_FAIL,

    NEW_ANIMALS_REQUEST,
    NEW_ANIMALS_SUCCESS,
    NEW_ANIMALS_FAIL,

    UPDATE_ANIMALS_REQUEST,
    UPDATE_ANIMALS_SUCCESS,
    UPDATE_ANIMALS_FAIL,

    DELETE_ANIMALS_REQUEST,
    DELETE_ANIMALS_SUCCESS,
    DELETE_ANIMALS_FAIL,

    ADOPT_ANIMALS_REQUEST,
    ADOPT_ANIMALS_SUCCESS,
    ADOPT_ANIMALS_RESET,
    ADOPT_ANIMALS_FAIL,

    GET_ADOPT_REQUEST,
    GET_ADOPT_SUCCESS,
    GET_ADOPT_FAIL,

    CLEAR_ERRORS
} from '../constants/animalConstants';
export const getAnimals = (currentPage = 1, keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: ALL_ANIMALS_REQUEST })
        const { data } = await axios.get(`/api/v1/adoptables?keyword=${keyword}&page=${currentPage}`);

        dispatch({
            type: ALL_ANIMALS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const allAnimals = () => async (dispatch) => {
    try {

        dispatch({ type: FULL_ANIMALS_REQUEST })

        const { data } = await axios.get('/api/v1/animals')

        dispatch({
            type: FULL_ANIMALS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FULL_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getAnimalDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ANIMAL_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/animal/${id}`)
        dispatch({
            type: ANIMAL_DETAILS_SUCCESS,
            payload: data.animal
        })
    } catch (error) {
        dispatch({
            type: ANIMAL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getSingleAnimal = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/animal/details/${id}`)
        dispatch({
            type: SINGLE_DETAILS_SUCCESS,
            payload: data.animal
        })
    } catch (error) {
        dispatch({
            type: SINGLE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newAnimal = (animalData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ANIMALS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/animal/new', animalData, config)

        dispatch({
            type: NEW_ANIMALS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateAnimal = (id, animalData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ANIMALS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/animal/${id}`, animalData, config)

        dispatch({
            type: UPDATE_ANIMALS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAnimal = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ANIMALS_REQUEST })

        const { data } = await axios.delete(`/api/v1/animal/${id}`)

        dispatch({
            type: DELETE_ANIMALS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const adopt = (id, formData) => async (dispatch) => {
    try {

        dispatch({ type: ADOPT_ANIMALS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/animal/adoption/${id}`, formData)

        dispatch({
            type: ADOPT_ANIMALS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADOPT_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdopt = (formData) => async (dispatch) => {
    try {

        dispatch({ type: GET_ADOPT_REQUEST })

        const { data } = await axios.get('/api/v1/adopt', formData)

        dispatch({
            type: GET_ADOPT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_ADOPT_FAIL,
            payload: error.response.data.message
        })
    }
}