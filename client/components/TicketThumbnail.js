import Lottie from "lottie-react";
import animationData1 from "../assets/sports.json";
import animationData2 from "../assets/singing.json";
import animationData3 from "../assets/stage.json";
import animationData4 from "../assets/football.json";

const TicketThumbnail = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center m-24">
      <h1 className="text-5xl font-bold mb-10">
        Explore Our University.
        <span className="text-5xl font-bold text-yellow-300">Campus.</span>
      </h1>
      <div className="flex gap-5 flex-wrap justify-center">
        <div className="w-[210px] bg-white rounded-lg shadow-2xl shadow-gray-700 relative">
          <Lottie
            style={{ objectFit: "contain", zIndex: 1 }}
            animationData={animationData1}
          />
          <span className="absolute bottom-2 left-2 text-black font-bold">
            Campus Tours
          </span>
        </div>
        <div className="w-[210px] bg-white rounded-lg shadow-2xl shadow-gray-700 relative">
          <Lottie
            style={{ objectFit: "contain", zIndex: 1 }}
            animationData={animationData2}
          />
          <span className="absolute bottom-2 left-2 text-black font-bold">
            Academic Programs
          </span>
        </div>
        <div className="w-[210px] bg-white rounded-lg shadow-2xl shadow-gray-700 relative">
          <Lottie
            style={{ objectFit: "contain", zIndex: 1 }}
            animationData={animationData3}
          />
          <span className="absolute bottom-2 left-2 text-black font-bold">
            Campus Events
          </span>
        </div>
        <div className="w-[210px] bg-white rounded-lg shadow-2xl shadow-gray-700 relative">
          <Lottie
            style={{ objectFit: "contain", zIndex: 1 }}
            animationData={animationData4}
          />
          <span className="absolute bottom-2 left-2 text-black font-bold">
            Student Life
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketThumbnail;
