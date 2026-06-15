import React from 'react'
import { Container , Row , Col } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';
import Hero from '../../sections/Hero/Hero';
import About from '../../sections/About/About';
import Pricing from '../../sections/Pricing/Picing';
import Player from '../../sections/Player/Player';
import Programs from '../../sections/Programs/Programs';
import State from '../../sections/State/State';
import Footer from '../../components/Footer/Footer';
import './Home.css';
import { handleJoin } from "../../utils/joinHandler";


const Home = () => {
  return (
    <>
    {/* <NavBar /> */}
    <Hero />
    {/* <About />    
    <Pricing />
    <Player />
    <Programs />
    <State />
    <Footer /> */}
    </>
  )
}

export default Home
