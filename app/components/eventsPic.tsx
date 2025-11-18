import React from 'react';

const EventsPic = () => {
  return (
    <div className="relative w-full flex justify-center">
      <img
        src="events.png"
        alt="events"
        className="md:w-[100vw] w-[200vw] max-w-none mx-auto mt-22 rotate-2 mb-12 -ml-2"
      />

      <img
        src="clock.png"
        alt="clock"
        className="absolute lg:-top-[8vw] md:-top-[4vw] top-0 lg:left-[8vw] md:left-[4vw] left-0 md:w-[17vw] w-[26vw] h-auto"
      />

      <img
        src="express.png"
        alt="express"
        className="absolute lg:-bottom-[2vw] -bottom-0 lg:right-[10vw] md:right-[10vw] right-[1vw] md:w-[10vw] w-[17vw] h-auto"
      />
    </div>
  );
};

export default EventsPic;

