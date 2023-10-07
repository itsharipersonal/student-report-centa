const Discover = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center m-10">
        Discover Our University
      </h1>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="min-w-[250px] min-h-[200px] max-w-[400px] bg-white rounded">
          <div className="text-black flex flex-col items-start gap-5 m-5">
            <h2 className="text-black text-1xl font-bold text-center ">
              ACADEMIC PROGRAMS
            </h2>
            <p className="text-black text-3xl font-bold">
              Explore Our Diverse Range of Academic Programs
            </p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="min-w-[250px] min-h-[200px] max-w-[400px] bg-white rounded">
          <div className="text-black flex flex-col items-start gap-5 m-5">
            <h2 className="text-black text-1xl font-bold text-center mt-3">
              CAMPUS LIFE
            </h2>
            <p className="text-black text-3xl font-bold">
              Get Involved in Campus Activities and Clubs
            </p>
            <button>Discover More</button>
          </div>
        </div>
        <div className="min-w-[250px] min-h-[200px] max-w-[400px] bg-white rounded">
          <div className="text-black flex flex-col items-start gap-5 m-5">
            <h2 className="text-black text-1xl font-bold text-center mt-3">
              ALUMNI SUCCESS
            </h2>
            <p className="text-black text-3xl font-bold">
              Learn About Our Graduates' Achievements
            </p>
            <button>Read Stories</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
