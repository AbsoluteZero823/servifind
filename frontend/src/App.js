import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Try from './components/Try'
import Become from './components/Become'
import Login from './components/user/Login'
import About from './components/About'
import Contact from './components/Contact_us'
import Maintenance from './components/layout/Maintenance'

import Register from './components/user/Register'
import Application from './components/user/forms/Application'
import Profile from './components/user/Profile'

import Dashboard from './components/admin/Dashboard'
import FreelancerDashboard from './components/user/freelancer/Dashboard';
import Users from './components/user/Users'
import Freelancers from './components/user/Freelancers'
import Create from './components/user/Create'
import UpdateUser from './components/admin/UpdateUser'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import SingleService from './components/service/SingleService';



import Services from './components/service/Services'
import NewService from './components/service/NewService'
import UpdateService from './components/service/UpdateService'

import MyInquiries from './components/user/client/MyInquiries';
import InquiriesList from './components/user/client/InquiriesList'
import InquiriesListC from './components/user/freelancer/InquiriesListC'


import MyTransactions from './components/user/MyTransactions';
import UserTransactions from './components/user/client/UserTransactions';
import Feed from './components/Feed';
import PostRequest from './components/user/client/PostRequest';
import ManageRequest from './components/user/client/ManageRequest';
import FreelancerOffers from './components/user/client/FreelancerOffers';

import Chat from './components/user/ChatPage';
import EmailVerify from './components/emailVerify/index'
import ApplicationEntries from './components/admin/ApplicationEntries';
import Premium from './components/user/freelancer/Premium';
import ApplicationPremium from './components/admin/ApplicationPremium';
import MyServices from './components/user/freelancer/MyServices';

import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux'
import store from './store'

import Sidebar from './components/admin/Sidebar';
import { RequestOffer } from './actions/offerActions';

function App() {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  useEffect(() => {
    store.dispatch(loadUser());

  }, [])


  return (
    <Router>

      {/* <Routes>
        <Route path={`${process.env.REACT_APP_URL}/user/:id/verify/:token`} element={<EmailVerify />} exact />
      </Routes> */}
      <div className='App'>
        <Header />

        {user && isAuthenticated ? (
          <div className='row'>

            <div className="col-12 col-md-2">
              <Sidebar />
            </div>
            <div className="col-13 col-md-2">
            </div>


            <div className='col-13 col-md-10' id='no-padding'>
              <div className='main'>

              </div>



            </div>
          </div>
        ) : (

          <div className='main'>


          </div>

        )}

        <div className='forRoutes' style={isAuthenticated ? { paddingLeft: '16.666667%' } : { paddingLeft: '0px' }}>
          <Routes>

            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} exact />
            <Route path="/all" element={<Try />} exact />
            <Route path="/my-inquiries" element={
              <ProtectedRoute>
                <InquiriesList />
              </ProtectedRoute>
            } exact />
            <Route path="/become-freelancer" element={<Become />} exact />
            <Route path="/application" element={
              <ProtectedRoute>
                <Application />
              </ProtectedRoute>
            } exact />
            <Route path="/search/:keyword" element={<Try />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/about" element={<About />} exact />
            <Route path="/contact" element={<Contact />} exact />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } exact />

            <Route path="/freelancer/dashboard" element={
              <ProtectedRoute>
                <FreelancerDashboard />
              </ProtectedRoute>
            } exact="true" />

            <Route path="/users" element={<Users />} exact />
            <Route path="/all/freelancers" element={<Freelancers />} exact />
            <Route path="/create" element={<Create />} exact />
            <Route path="/user/:id" element={<UpdateUser />} exact />
            <Route path="/service/details/:id" element={<SingleService />} />
            <Route path="/maintenance" element={<Maintenance />} exact />

            <Route path="/client-inquiries" element={
              <ProtectedRoute>
                <InquiriesListC />
              </ProtectedRoute>
            } exact />

            <Route path="/transactions" element={
              <ProtectedRoute>
                <MyTransactions />
              </ProtectedRoute>
            } exact />
            <Route path="/my/transactions" element={
              <ProtectedRoute>
                <UserTransactions />
              </ProtectedRoute>
            } exact />
            <Route path="/feed/category/:categoryId" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } exact />
            <Route path="/feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } exact />
            <Route path="/post-request" element={
              <ProtectedRoute >
                <PostRequest />
              </ProtectedRoute>
            } exact />
            <Route path="/manage-requests" element={
              <ProtectedRoute >
                <ManageRequest />
              </ProtectedRoute>
            } exact />
            <Route path="/offers-request/:request_id" element={
              <ProtectedRoute isAdmin={true}>
                <RequestOffer />
              </ProtectedRoute>
            } exact />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } exact />
            {/* <Route path="/user/:id/verify/:token" element={<EmailVerify />} exact /> */}
            <Route path="/application-entries" element={
              <ProtectedRoute isAdmin={true}>
                <ApplicationEntries />
              </ProtectedRoute>
            } exact />
            <Route path="/premium" element={<Premium />} exact />
            <Route path="/application-premium" element={
              <ProtectedRoute isAdmin={true}>
                <ApplicationPremium />
              </ProtectedRoute>
            } exact />
            <Route path="/services/:id" element={<MyServices />} exact />

            <Route path="/services" element={
              <ProtectedRoute isAdmin={true}>
                <Services />
              </ProtectedRoute>
            } exact="true" />

            <Route path="/service/new" element={
              <ProtectedRoute isAdmin={true}>
                <NewService />
              </ProtectedRoute>
            } exact="true" />


            <Route path="/service/:id" element={
              <ProtectedRoute isAdmin={true}>
                <UpdateService />
              </ProtectedRoute>
            } exact="true" />


            <Route path="/me/update" element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            } exact="true" />

            <Route path="/password/update" element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            } exact="true" />







            {user ? (user.role === "admin" && <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } exact />


            ) : <Route path="/" element={<Home />} exact />}
            {user && user.role === 'customer' && (
              <Route path="/" element={<Try />} exact />
            )}






            <Route path="/password/update" element={
              <ProtectedRoute >
                <UpdatePassword />
              </ProtectedRoute>} />
          </Routes>

        </div>

      </div>




    </Router>

  )
}

export default App;



