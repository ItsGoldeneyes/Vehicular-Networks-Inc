import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Rewards from '../components/Rewards';
import Footer from '../components/Footer';
import Modules from '../components/Modules';


function Home() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <Rewards />
      <Modules />
    </div>
  );
}

export default Home;
