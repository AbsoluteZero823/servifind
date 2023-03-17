import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,

    APPLICATION_USER_REQUEST,
    APPLICATION_USER_SUCCESS,
    APPLICATION_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    ACTIVATE_USER_REQUEST,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_RESET,
    ACTIVATE_USER_FAIL,

    DEACTIVATE_USER_REQUEST,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_RESET,
    DEACTIVATE_USER_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    ALL_ADOPTERS_REQUEST,
    ALL_ADOPTERS_SUCCESS,
    ALL_ADOPTERS_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    ALL_FREELANCERS_REQUEST,
    ALL_FREELANCERS_SUCCESS,
    ALL_FREELANCERS_FAIL,



    NEW_USERS_REQUEST,
    NEW_USERS_SUCCESS,
    NEW_USERS_FAIL,

    NEW_ADOPTERS_REQUEST,
    NEW_ADOPTERS_SUCCESS,
    NEW_ADOPTERS_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,


    CLEAR_ERRORS
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:3000/api/v1/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const application = (userData) => async (dispatch) => {
    try {

        dispatch({ type: APPLICATION_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/application', userData, config)

        dispatch({
            type: APPLICATION_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: APPLICATION_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}
// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAdopters = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADOPTERS_REQUEST })

        const { data } = await axios.get('/api/v1/adopters')

        dispatch({
            type: ALL_ADOPTERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ADOPTERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const allFreelancers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_FREELANCERS_REQUEST })

        const { data } = await axios.get('/api/v1/freelancers')

        dispatch({
            type: ALL_FREELANCERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_FREELANCERS_FAIL,
            payload: error.response.data.message
        })
    }
}
// export const getPersonnels = () => async (dispatch) => {
//     try {

//         dispatch({ type: ALL_PERSONNELS_REQUEST })

//         const { data } = await axios.get('/api/v1/personnels')

//         dispatch({
//             type: ALL_PERSONNELS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: ALL_PERSONNELS_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }
export const newUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_USERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/create', userData, config)

        dispatch({
            type: NEW_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const newAdopter = (adopterData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPTERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/adopter/new', adopterData, config)

        dispatch({
            type: NEW_ADOPTERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPTERS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/user/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,

        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


//   export const activateUser = (id) => async (dispatch) => {
//     try {

//         dispatch({ type: ACTIVATE_USER_REQUEST })


//         const { data } = await axios.put(`/api/v1/activate/user/${id}`)

//         dispatch({
//             type: ACTIVATE_USER_SUCCESS,
//             payload: data.success
//         })

//     } catch (error) {
//         dispatch({
//             type: ACTIVATE_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
//   }
export const activateUser = (id, UserData) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/user/${id}`, UserData, config)

        dispatch({
            type: ACTIVATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deactivateUser = (id, serData) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/userd/${id}`, serData, config)

        dispatch({
            type: DEACTIVATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/customer/${id}`, userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAdopter = (id, adopterData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/adopter/${id}`, adopterData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}