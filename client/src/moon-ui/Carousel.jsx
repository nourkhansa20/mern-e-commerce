import React, { useState, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';

const Carousel = ({ images = [], baseUrl = '', interval = 10000, showGallery = false, showIndicators = true, autoPlay = false, className = '', imageContainerClassName = 'h-full', imageClassName = 'object-cover' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [arrowsVisible, setArrowsVisible] = useState(false);
    const intervalRef = useRef();
    const startXRef = useRef(0);
    const currentXRef = useRef(0);

    const startTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
    }, [interval, images.length]);

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        if (autoPlay) startTimer();
    }, [autoPlay, startTimer]);

    useEffect(() => {
        if (autoPlay && images.length > 0) {
            startTimer();
        }
        return () => clearInterval(intervalRef.current);
    }, [autoPlay, images.length, startTimer]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        resetTimer();
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        resetTimer();
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
        resetTimer();
    };

    const handleTouchStart = (e) => {
        startXRef.current = e.touches[0].clientX;
        currentXRef.current = startXRef.current;
    };

    const handleTouchMove = (e) => {
        currentXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const deltaX = currentXRef.current - startXRef.current;
        if (deltaX > 50) {
            handlePrev();
        } else if (deltaX < -50) {
            handleNext();
        }
    };

    const handleMouseDown = (e) => {
        startXRef.current = e.clientX;
        currentXRef.current = startXRef.current;
    };

    const handleMouseMove = (e) => {
        if (startXRef.current !== 0) {
            currentXRef.current = e.clientX;
        }
    };

    const handleMouseUp = () => {
        const deltaX = currentXRef.current - startXRef.current;
        if (deltaX > 50) {
            handlePrev();
        } else if (deltaX < -50) {
            handleNext();
        }
        startXRef.current = 0;
    };

    const handleMouseLeave = () => {
        if (startXRef.current !== 0) {
            handleMouseUp();
        }
    };

    const handleImageClick = (index) => {
        setCurrentIndex(index);
    };

    const handleMouseEnter = () => {
        setArrowsVisible(true);
    };

    const handleMouseLeaveCarousel = () => {
        setArrowsVisible(false);
    };

    if (images.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className={`relative ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeaveCarousel}>
            {/* Main Carousel */}
            <div
                className="relative h-full overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className={`flex transition-transform duration-1000 ease-in-out ${imageContainerClassName}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            src={`${baseUrl}${image}`}
                            key={index}
                            className={`w-full flex-shrink-0  rounded-md object-contain ${imageClassName}`}
                            // style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
                {/* Navigation Arrows */}
                {arrowsVisible && <Arrow onClick={handlePrev} className="left-0" icon="<" />}
                {arrowsVisible && <Arrow onClick={handleNext} className="right-0" icon=">" />}

                {/* Indicators */}
                {showIndicators && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={classnames('w-3 h-3 rounded-full transition', {
                                    'bg-white': index === currentIndex,
                                    'bg-white opacity-25': index !== currentIndex,
                                })}
                                onClick={() => handleIndicatorClick(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                )}
            </div>
            {/* Image Gallery Preview */}
            {showGallery && (
                <>
                    <hr className='mt-2' />
                    <div className="flex justify-center max-w-full items-center mt-4 space-x-2 overflow-auto ">
                        {images.map((image, index) => (
                            <img
                                src={`${baseUrl}${image}`}
                                key={index}
                                className="min-w-20 h-20 object-contain cursor-pointer"
                                onClick={() => handleImageClick(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const Arrow = ({ className, onClick, icon }) => (
    <button
        className={`${className} absolute top-1/2 h-full transform -translate-y-1/2 text-white p-2 w-[5ex]`}
        onClick={onClick}
        aria-label={icon === '<' ? 'Previous Slide' : 'Next Slide'}
    >
        {icon}
    </button>
);

export default Carousel;
