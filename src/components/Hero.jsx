import React, { useState, useEffect, lazy, Suspense } from 'react';
import { FaInstagramSquare, FaGithub, FaLinkedin, FaBehanceSquare } from 'react-icons/fa';
import RotatingText from './RotatingText';
import TextPressure from './TextPressure';

// Lazy load Spline for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const [showSpline, setShowSpline] = useState(false);
  const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), isMobile ? 1500 : 500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section
      id="hero"
      className="relative flex flex-col sm:flex-col lg:flex-row justify-center items-center h-screen px-0 md:px-0 overflow-hidden bg-black pb-32"
    >
      {/* Left Side */}
      <div className="text-center md:text-left z-10 order-last md:order-first mt-0 md:ml-16 md:mt-10">
        <div className="relative h-[100px] sm:h-[160px] md:h-[200px] mt-4 sm:mt-6 md:mt-8 md:translate-y-10 sm:pr-12">
          <TextPressure
            className="font-bold text-7xl sm:text-8xl md:text-9xl"
            text=" Front End"
            flex={true}
            alpha={false}
            stroke={false}
            width={false}
            weight={true}
            italic={false}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>

        {/* RotatingText */}
        <div className="-mt-6 sm:-mt-8 md:-mt-10 pl-0 sm:pl-0 sm:pr-12 md:pl-0">
          <div className="h-[60px] sm:h-[64px] md:h-[72px] flex items-center justify-center overflow-hidden">
            <RotatingText
              className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-cyan-300"
              texts={['Developer', 'Designer', 'Creator']}
              mainClassName="px-2 sm:px-6 md:px-12 bg-cyan-300 text-black overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg inline-block"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.04}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-4"
              transition={{ type: 'spring', damping: 50, stiffness: 400 }}
              rotationInterval={3000}
            />
          </div>
        </div>

        {/* Social Icons */}
        <ul className="flex gap-12 md:gap-16 mt-6 pt-6 sm:pt-2 sm:pr-10 md:mt-12 text-white text-2xl sm:text-3xl place-items-center md:place-items-start">
          <li><a href="https://www.instagram.com/kenith_leon_"><FaInstagramSquare /></a></li>
          <li><a href="https://github.com/kenithleon"><FaGithub /></a></li>
          <li><a href="https://www.linkedin.com/in/kenith-leon/"><FaLinkedin /></a></li>
          <li><a href="https://www.behance.net/kenithleon"><FaBehanceSquare /></a></li>
        </ul>
      </div>

      {/* Right Side: Spline */}
      <div className="flex sm:flex-row items-center justify-end px-4 mr-4 sm:px-8 mb-12 pr-0 sm:pr-16 brightness-150 z-30">
        <div
          className="w-[440px] sm:w-[540px] md:w-[720px] lg:w-[900px] pt-1
                     h-[380px] sm:h-[400px] md:h-[560px] lg:h-[640px]
                     relative right-[-10px] sm:right-[-40px] lg:left-40 sm:top-20 z-30"
        >
          {showSpline && (
            
              <Spline scene="https://prod.spline.design/iyQTlT68Md4wZY5u/scene.splinecode" />
           
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
