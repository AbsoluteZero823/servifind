
import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useParams } from "react-router-dom";
import MetaData from './layout/MetaData'
// import Animal from './animal/Animal'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
// import { getAnimals } from '../actions/animalActions'

// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'


const Become = () => {

  // const { createSliderWithToolTip } = Slider;
  // const Range = createSliderWithToolTip(Slider.Range);


  const alert = useAlert();
  const dispatch = useDispatch();


  return (
    <Fragment>
      <section id='cm-intro'>
        <MetaData title={'Become a Freelancer'} />
        <div className='intro'>
          <div className='welcome' style={{ padding: '0px 100px' }}>

            <h3 className='firstTitle'>Who are Eligible?</h3>

            <div className='infoBody' style={{ display: 'flex', }}>
              <div className='thirtyfive-percent'>
                <img src='../images/students-college.png' ></img>
              </div>
              <div style={{ width: '65%', paddingLeft: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ color: 'white', }}>
                  <h3 className='' style={{ paddingBottom: '10px' }}>To apply for freelancer, user must:</h3>

                  <h3 className=''>— Currently enrolled at Technological University of the Philippines Taguig Branch.</h3>
                  <h3 className=''>— Uses a verified TUP email account.</h3>
                  <h3 className=''>— Pass the requirements needed.</h3>

                  {/* <h3 className=''>Any student currently enrolled at Technological University of the Philippines Taguig Branch</h3> */}

                </div>
                <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-start' }}>
                  <Link to='/application'><button className='nav-button'>Become a Freelancer</button></Link>
                </div>
              </div>
            </div>
            {/* <h4 className='firstTitle' style={{ fontSize: "80px" }}>Want to Become a Freelancer?</h4> */}

            {/* <p>WHERE YOU CAN FIND THE BEST SERVICE IN THE RIGHT TIME ON THE RIGHT PERSON
            </p> */}



          </div>
          <img id='home' className='bg-pic' src='../images/TUPT.jpg'></img>

        </div>

      </section>

      {/* <div className='welcome'>
        <h3>WELCOME TO SERVIFIND</h3>

       
      </div>
      <img id='home' className='bg-pic' src='../images/bg.jpg'></img> */}
      {/* <h1 className='gitna'>HOME</h1> */}


      {/* <div className='features' id='features'>
        <h3 className='title'>FEATURES</h3>
      </div> */}

      {/* MEET OUR TEAM */}
      {/* <div className="our-team" id='our-team'>
        <h1 className="heading"><span>meet </span>Our Team</h1>
        <br></br><br></br>
        <div className="profiles">
          <div className="profile">
            <img src="../images/team1.jpg" className="profile-img"></img>

            <h3 className="user-name">Cherry May Agustin</h3>
            <h5>Paper Manager / Web Designer</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
          </div>
          <div className="profile">
            <img src="../images/team2.jpg" className="profile-img"></img>

            <h3 className="user-name">Kendrick Galan</h3>
            <h5>Lead Developer / Mobile Developer</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis sint quod.</p>
          </div>
          <div className="profile">
            <img src="../images/team3.jpg" className="profile-img"></img>

            <h3 className="user-name">Lenal Ladaga</h3>
            <h5>Project Manager / Web Designer </h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, eveniet!</p>
          </div>

        </div>
        <div className="profiles">
          <div className="profile">
            <img src="../images/team4.jpg" className="profile-img"></img>

            <h3 className="user-name">Marvin Olazo</h3>
            <h5>External Relation Officer</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
          </div>
          <div className="profile">
            <img src="../images/team5.jpg" className="profile-img"></img>

            <h3 className="user-name">Marwin Vislenio</h3>
            <h5>External Relation Officer</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eveniet soluta hic sunt sit reprehenderit.</p>
          </div>
        </div>
      </div> */}
      {/* MEET OUR TEAM END */}




      {/* {loading ? <Loader /> : (
        <Fragment>
        
          <h1 id="animals_heading">Latest Animals</h1>
          <section id="animals" className="container mt-5">
            <div className="row">
              {animals && animals.map(animal => (
                <Animal key={animal._id} animal={animal} />
              ))}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={animalsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}

        </Fragment>
      )
      } */}
    </Fragment >
  );
}
export default Become
