


import React from "react";

const Departement = () => {
  return (
    <div id="departement">
      <div className="text-center flex-col flex justify-center items-center mt-10 md:mt-20 px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#2F3729] magic-school">
          Discover our houses
        </h1>
        <img src="/ligne.svg" alt="divider" className="md:mt-4 md:w-auto w-[50%]" />
      </div>

      {/* SECTION AVEC DEUX BLOCS + IMAGE AU MILIEU */}
      <div className="relative flex flex-col lg:flex-row justify-center items-center lg:gap-[200px] gap-12 mt-12 lg:mt-18 px-4">

        {/* Bloc gauche */}
        <div className="w-full lg:w-[30%] text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school">IT department</h1>
          <p className="text-lg md:text-xl text-[#2F3729] mt-2">The IT team manages the club's digital infrastructure and database while fostering problem-solving and self-learning skills.</p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school mt-8 lg:mt-12">Marketing department</h1>
          <p className="text-lg md:text-xl text-[#2F3729] mt-2">The Marketing team promotes the club's image through targeted content and impactful social media communication.</p>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school mt-8 lg:mt-12">b2B department</h1>
          <p className="text-lg md:text-xl text-[#2F3729] mt-2">The marketing department is a highly dynamic environment that promotes our club's image to specific target audiences through social media.</p>
        </div>

        {/* Image centrée - visible seulement sur desktop */}
        <img
          src="/AdobeStock-removebg-preview.png"
          alt="center icon"
          className="hidden lg:block absolute w-auto h-auto mt-12"
        />

        {/* Bloc droit */}
        <div className="w-full lg:w-[30%] text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school lg:mt-12">Design department</h1>
          <p className="text-lg md:text-xl text-[#2F3729] mt-2">The Design Team handles the aesthetic aspects of our club's activities and events (social media posts, UI/UX, etc.)</p>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school mt-8 lg:mt-12">HR department</h1>
          <p className="text-lg md:text-xl text-[#2F3729] mt-2">HR manages members, recruiting, and guiding them to teams that match their skills and interests. They value versatility and a strong willingness to learn above all else.</p>
        </div>
      </div>

      {/* Citation */}
      <div className="px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2F3729] magic-school mt-20 lg:mt-32 text-center">
          "Ce qui ne se partage<br className="hidden md:block"/> pas se perd"
        </h1>
      </div>
    </div>
  );
};

export default Departement;