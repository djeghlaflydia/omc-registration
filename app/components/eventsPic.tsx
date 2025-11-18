import React from 'react';

const EventsPic = () => {
  return (
    <div className="relative w-full flex justify-center">
      <img
        src="events.png"
        alt="events"
        className="w-[100vw] max-w-none mx-auto mt-22 rotate-2 mb-12 -ml-2"
      />

      <img
        src="clock.png"
        alt="clock"
        className="absolute -top-28 left-32 w-64 h-auto"
      />

      <img
        src="express.png"
        alt="express"
        className="absolute -bottom-10 right-44 w-42 h-auto"
      />
    </div>
  );
};

export default EventsPic;
