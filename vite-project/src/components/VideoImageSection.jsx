import React, { useState, useEffect } from 'react';

const VideoImageSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const mediaItems = [
    { type: 'image', src: '/media/image1.png', alt: 'Image 1' },
    { type: 'image', src: '/media/image2.jpg', alt: 'Image 2' },
    { type: 'video', src: '/media/video1.mp4', alt: 'Video 1' },
    { type: 'video', src: '/media/video2.mp4', alt: 'Video 2' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mediaItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-full max-h-full">
        {currentItem.type === 'image' ? (
          <img 
            src={currentItem.src} 
            alt={currentItem.alt}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video 
            src={currentItem.src} 
            autoPlay 
            muted 
            loop
            className="max-w-full max-h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {mediaItems.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoImageSection; 