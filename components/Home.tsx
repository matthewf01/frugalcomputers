

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './common/Button';
import { LOGO_BASE64, CAROUSEL_IMAGES } from '../constants';
import { ImageCarousel } from './ImageCarousel';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-900 opacity-60"></div>
                <div 
                    className="absolute inset-0 bg-no-repeat bg-center opacity-10"
                    style={{ 
                        backgroundImage: `url(${LOGO_BASE64})`,
                        backgroundSize: '40%',
                    }}
                ></div>
                <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>
            <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                    Reliable, Frugal Tech Support
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                    Serving home and small business users in Suwanee, Sugar Hill, Duluth, Alpharetta and surrounding Georgia suburbs. We make technology work for you, without breaking the bank.
                    <span className="block mt-2 font-semibold">In-home or remote assistance available!</span>
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <NavLink to="/services">
                        <Button variant="primary">Request Service</Button>
                    </NavLink>
                    <a href="https://nextdoor.com/page/frugal-computers-suwanee-ga/" target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary">See us on Nextdoor</Button>
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              About Frugal Computers
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Founded on the principle that quality tech support shouldn't be a luxury, Frugal Computers is dedicated to providing affordable and effective solutions for our community. As a life-long tech fanatic turned IT Professional, we understand the needs of home users and small businesses alike.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Our mission is simple: to offer honest advice, transparent pricing, and dependable repairs. We treat your technology as if it were our own, ensuring you get back up and running as quickly and efficiently as possible.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <ImageCarousel images={CAROUSEL_IMAGES} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;