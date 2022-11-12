import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { animalsReducer, animalDetailsReducer, newAnimalReducer, UpDelAnimalReducer, allAnimalsReducer, singleAnimalReducer, adoptReducer, getAdoptReducer } from './reducers/animalReducers'
import { authReducer, getUsersReducer, userReducer, UpDelUserReducer, newPersonnelReducer, userDetailsReducer } from './reducers/userReducers'
import { servicesReducer, serviceDetailsReducer, newServiceReducer, UpDelServiceReducer } from './reducers/serviceReducers'
const reducer = combineReducers({
    animals: animalsReducer,
    allAnimal: allAnimalsReducer,
    animalDetails: animalDetailsReducer,
    addAnimal: newAnimalReducer,
    addPersonnel: newPersonnelReducer,
    updelAnimal: UpDelAnimalReducer,

    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    userDetails: userDetailsReducer,
    addService: newServiceReducer,
    updelService: UpDelServiceReducer,
    auth: authReducer,
    user: userReducer,
    users: getUsersReducer,
    updelUser: UpDelUserReducer,
    singleAnimal: singleAnimalReducer,
    adopt: adoptReducer,
    getAdopt: getAdoptReducer



})
let initialState = {
}
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;

// pinalitan ko ung createStore ng configureStore