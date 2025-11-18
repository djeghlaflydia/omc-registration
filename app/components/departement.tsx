import React from "react";

const Departement = () => {
  return (
    <div>
      <div className="text-center flex-col flex justify-center items-center mt-20">
        <h1 className="text-7xl text-[#2F3729] magic-school">
          Discover our houses
        </h1>
        <img src="/ligne.svg" alt="divider" />
      </div>

      {/* SECTION AVEC DEUX BLOCS + IMAGE AU MILIEU */}
      <div className="relative flex justify-center items-center gap-[200px] mt-18">

        {/* Bloc gauche */}
        <div className="w-[30%] ">
        <h1 className="text-6xl text-[#2F3729] magic-school">IT department</h1>
        <p  className="text-xl text-[#2F3729] mt-2">The IT team manages the club’s digital infrastructure and database while fostering problem-solving and self-learning skills.</p>

        <h1 className="text-6xl text-[#2F3729] magic-school mt-12">Marketing department </h1>
        <p  className="text-xl text-[#2F3729] mt-2">The Marketing team promotes the club’s image through targeted content and impactful social media communication.</p>
        
        <h1 className="text-6xl text-[#2F3729] magic-school mt-12">b2B department </h1>
        <p  className="text-xl text-[#2F3729] mt-2">The marketing department is a highly dynamic environment that promotes our club's image to specific target audiences through social media.</p>
        
        </div>

        {/* Bloc droit */}
        <div className="w-[30%]">
             <h1 className="text-6xl text-[#2F3729] magic-school mt-12">Design department</h1>
        <p  className="text-xl text-[#2F3729] mt-2">The Design Team handles the aesthetic aspects of our club's activities and events (social media posts, UI/UX, etc.)</p>
        
        <h1 className="text-6xl text-[#2F3729] magic-school mt-12">HR department</h1>
        <p  className="text-xl text-[#2F3729] mt-2">HR manages members, recruiting, and guiding them to teams that match their skills and interests. They value versatility and a strong willingness to learn above all else.</p>
        
        </div>

        {/* Image centrée et au-dessus */}
        <img
          src="/AdobeStock-removebg-preview.png"
          alt="center icon"
          className="absolute w-auto h-auto mt-12"
        />
      </div>

      <h1 className="text-6xl text-[#2F3729] magic-school mt-32 text-center">“Ce qui ne se partage<br/>pas ce perd"</h1>
    </div>
  );
};

export default Departement;
