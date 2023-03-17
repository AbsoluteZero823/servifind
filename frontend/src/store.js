import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
// import { animalsReducer, animalDetailsReducer, newAnimalReducer, UpDelAnimalReducer, allAnimalsReducer, singleAnimalReducer, adoptReducer, getAdoptReducer } from './reducers/animalReducers'
import { authReducer, getUsersReducer, userReducer, UpDelUserReducer, newUserReducer, userDetailsReducer } from './reducers/userReducers'
import { servicesReducer, serviceDetailsReducer, newServiceReducer, UpDelServiceReducer } from './reducers/serviceReducers'
import { newInquiryReducer, inquiriesReducer, inquiryDetailsReducer, statusReducer } from './reducers/inquiryReducers';
import { getTransactionsReducer, newTransactionReducer, transactionDetailsReducer, paymentReducer } from './reducers/transactionReducers';
import { freelancerDetailsReducer } from './reducers/freelancerReducers';
// import { getTransactions } from '../../backend/controllers/transactionController';
const reducer = combineReducers({

    addPersonnel: newUserReducer,


    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    userDetails: userDetailsReducer,
    addService: newServiceReducer,
    updelService: UpDelServiceReducer,
    auth: authReducer,
    user: userReducer,
    users: getUsersReducer,
    updelUser: UpDelUserReducer,

    inquiry: newInquiryReducer,
    inquiries: inquiriesReducer,
    singleInquiry: inquiryDetailsReducer,
    updateStatus: statusReducer,

    transaction: newTransactionReducer,
    transactions: getTransactionsReducer,
    transactionDetails: transactionDetailsReducer,
    updatePayment: paymentReducer,

    freelancerDetails: freelancerDetailsReducer
})
let initialState = {
}
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;

// pinalitan ko ung createStore ng configureStore