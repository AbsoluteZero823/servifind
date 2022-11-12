// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Noelanfe Gregorio Villadarez
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           SAKALAM
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Try from './components/Try'
import Become from './components/Become'
import Login from './components/user/Login'
import About from './components/About'
import Contact from './components/Contact_us'
// import AnimalDetails from './components/animal/AnimalDetails'

import Register from './components/user/Register'
import Application from './components/user/forms/Application'
import Profile from './components/user/Profile'

import Dashboard from './components/admin/Dashboard'
import Users from './components/user/Users'
import Freelancers from './components/user/Freelancers'
import Create from './components/user/Create'
import UpdateUser from './components/admin/UpdateUser'
import ProtectedRoute from './components/route/ProtectedRoute'
// import UpdateProfile from './components/user/UpdateProfile'
// import UpdatePassword from './components/user/UpdatePassword'

// import Animals from './components/animal/Animals'
// import NewAnimal from './components/animal/NewAnimal'
// import UpdateAnimal from './components/animal/UpdateAnimal'

// import Adopters from './components/adopter/Adopters'
// import NewAdopter from './components/adopter/NewAdopter'
// import UpdateAdopter from './components/adopter/UpdateAdopter'

// import Personnels from './components/personnel/Personnels'
// import NewPersonnel from './components/personnel/NewPersonnel'



import Services from './components/service/Services'
import NewService from './components/service/NewService'
import UpdateService from './components/service/UpdateService'

// import GetAdopted from './components/user/Adopted'

import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'
// import user from '../../backend/models/user';
//  <Route path="/product/:id" component={ProductDetails} exact />

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <div className="App">



        <Header />

        <div className="main">
          <Routes>
            {/* <Route path="/me" element={<Profile />} /> */}
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
            <Route path="/become-freelancer" element={<Become />} exact />
            <Route path="/application" element={<Application />} exact />
            {/* <Route path="/search/:keyword" element={<Home />} exact /> */}
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/about" element={<About />} exact />
            <Route path="/contact" element={<Contact />} exact />
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/users" element={<Users />} exact />
            <Route path="/freelancers" element={<Freelancers />} exact />
            <Route path="/create" element={<Create />} exact />
            <Route path="/user/:id" element={<UpdateUser />} exact />

            {/* <Route path="/adopt" element={<GetAdopted />} exact />
          <Route path="/animal/details/:id" element={<AnimalDetails />} exact />
          <Route path="/animal/adoption/:id" element={<AnimalDetails />} exact /> */}


            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}

            {/* 
          <Route path="/animals" element={
            <ProtectedRoute isAdmin={true}>
              <Animals />
            </ProtectedRoute>
          } exact="true" /> */}


            {/* <Route path="/animal/new" element={
            <ProtectedRoute isAdmin={true}>
              <NewAnimal />
            </ProtectedRoute>
          } exact="true" /> */}


            {/* <Route path="/animal/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAnimal />
            </ProtectedRoute>
          } exact="true" />
 */}



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

            {/*



          <Route path="/adopters" element={
            <ProtectedRoute isAdmin={true}>
              <Adopters />
            </ProtectedRoute>
          } exact="true" />


          <Route path="/adopter/new" element={
            <ProtectedRoute isAdmin={true}>
              <NewAdopter />
            </ProtectedRoute>
          } exact="true" />
          <Route path="/adopter/:id" element={<UpdateAdopter />} exact="true" />






          <Route path="/personnels" element={
            <ProtectedRoute adminOnly={true}>
              <Personnels />
            </ProtectedRoute>
          } exact="true" />


          <Route path="/personnel/new" element={
            <ProtectedRoute adminOnly={true}>
              <NewPersonnel />
            </ProtectedRoute>
          } exact="true" />



          <Route path="/personnel/:id" element={
            <ProtectedRoute adminOnly={true}>
              <UpdatePersonnel />
            </ProtectedRoute>
          } exact="true" />
 */}




            {/* <Route path="/login" element={<Login />} exact />

          <Route path="/register" element={
            <Register />
          } exact /> */}

            {/* <Route path="/activate/user/:id" element={<Adopters/>} exact/> */}
            {/* <Route path="/me" element={<Profile/>} exact /> */}



            {/* <Route path="/me/update" element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>} /> */}



            {/* <Route path="/password/update" element={
            <ProtectedRoute >
              <UpdatePassword />
            </ProtectedRoute>} /> */}
          </Routes>
        </div>

        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}
//get images from github repo
export default App;



