

import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

/**
 * To add or change carousel images:
 * 1. Create a folder structure in your project: `public/images/carousel/`.
 *    (The 'public' folder is the root for static assets).
 * 2. Place your image files (e.g., 'photo1.jpg', 'photo2.png') inside that 'carousel' folder.
 * 3. Go to the `constants.ts` file.
 * 4. Update the `CAROUSEL_IMAGES` array with the new paths to your images, for example:
 *    export const CAROUSEL_IMAGES = [
 *      '/images/carousel/photo1.jpg',
 *      '/images/carousel/photo2.png',
 *    ];
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, 5000); // Rotate every 5 seconds
    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(slideInterval);
  }, [currentIndex]); // Reset timer when user manually changes slide

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" data-carousel="slide">
      {/* Height is reduced by ~5% from original h-80 (20rem) and md:h-[26rem] */}
      <div className="relative h-[19rem] overflow-hidden rounded-lg md:h-[24.7rem] shadow-2xl">
        {images.map((image, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                <img src={image} className="absolute block w-full h-full object-cover" alt={`Carousel image ${index + 1}`} />
            </div>
        ))}
      </div>
      
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button 
        type="button" 
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-colors">
          <ChevronLeftIcon className="w-5 h-5 text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button 
        type="button" 
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-colors">
          <ChevronRightIcon className="w-5 h-5 text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};